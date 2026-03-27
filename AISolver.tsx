import { useState, useEffect } from 'react';
import { aiSolverService, AIResponse } from '@/lib/ai-solver';
import { Bot, Send, Loader2, Sparkles, AlertCircle, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  model?: string;
  tokensUsed?: number;
}

export default function AISolver() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [aiModel, setAiModel] = useState<string>('');
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const { toast } = useToast();

  // Check AI connection on mount
  useEffect(() => {
    (async () => {
      try {
        const status = await aiSolverService.testConnection();
        setAiModel(status.model);
        setConnectionStatus(status.connected ? 'connected' : 'error');
        
        if (status.connected) {
          toast({
            title: 'AI Connected',
            description: `Using ${status.model} model`,
          });
        } else {
          toast({
            title: 'AI Fallback Mode',
            description: 'Using local responses',
            variant: 'destructive'
          });
        }
      } catch (error) {
        console.error('Connection check error:', error);
        setConnectionStatus('error');
        setAiModel('mock');
      }
    })();
  }, [toast]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    const question = input;
    setInput('');
    setIsLoading(true);

    try {
      const response: AIResponse = await aiSolverService.askQuestion(question);
      
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: response.content,
        model: response.model,
        tokensUsed: response.tokens_used
      }]);

      // Show success toast for real API responses
      if (response.model !== 'mock') {
        toast({
          title: 'Response generated',
          description: `Using ${response.model} (${response.tokens_used} tokens)`
        });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to get response';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive'
      });
      
      // Add error message to chat
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `Error: ${errorMessage}\n\nPlease try again or contact support.`
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-emerald-100">
      {/* Header */}
      <div className="mb-4 mx-4 lg:mx-8 p-4 lg:p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="page-header flex items-center gap-2 text-3xl font-display font-bold bg-gradient-to-r from-emerald-700 via-green-700 to-emerald-600 bg-clip-text text-transparent">
              <Bot className="w-8 h-8" /> AI Doubt Solver
            </h1>
            <p className="text-lg text-muted-foreground mt-1">Ask any academic question and get instant help</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/50 backdrop-blur border border-white/20">
            {connectionStatus === 'connected' && <CheckCircle className="w-4 h-4 text-green-600" />}
            {connectionStatus === 'error' && <AlertCircle className="w-4 h-4 text-yellow-600" />}
            {connectionStatus === 'checking' && <Loader2 className="w-4 h-4 animate-spin text-blue-600" />}
            <span className="text-xs text-muted-foreground">
              {aiModel ? `${aiModel}` : 'Initializing...'}
            </span>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 glass-card mx-4 lg:mx-8 p-4 overflow-y-auto space-y-4 mb-4 max-w-4xl mx-auto w-full">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 animate-float">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-display font-semibold text-foreground mb-2">Ask me anything!</h3>
            <p className="text-sm text-muted-foreground max-w-md">
              I can help with Data Structures, Algorithms, Python, Machine Learning, React, SQL, and more.
              {connectionStatus === 'connected' && ` Using ${aiModel} for real-time responses.`}
            </p>
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {[
                'What is a data structure?',
                'Explain Python basics',
                'What is machine learning?',
                'How do algorithms work?',
                'What is React?'
              ].map(q => (
                <button
                  key={q}
                  onClick={() => setInput(q)}
                  className="text-xs px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground hover:bg-primary/20 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                msg.role === 'user'
                  ? 'btn-primary-gradient text-white'
                  : 'bg-secondary text-secondary-foreground'
              }`}
            >
              <div className="whitespace-pre-wrap font-body text-sm leading-relaxed">{msg.content}</div>
              {msg.model && msg.model !== 'mock' && (
                <div className="text-xs opacity-75 mt-2 pt-2 border-t border-current/20">
                  {msg.model}
                  {msg.tokensUsed ? ` • ${msg.tokensUsed} tokens` : ''}
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-secondary rounded-2xl px-4 py-3 flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="w-4 h-4 animate-spin" /> Thinking...
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="flex gap-2 mx-4 lg:mx-8 mb-8 max-w-4xl mx-auto w-full">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSend()}
          placeholder="Type your question (Shift+Enter for new line)..."
          className="input-glass flex-1 rounded-xl px-4 py-3 text-sm"
          disabled={isLoading}
        />
        <button
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
          className="btn-primary-gradient p-3 rounded-xl disabled:opacity-50 transition-all hover:shadow-lg"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
