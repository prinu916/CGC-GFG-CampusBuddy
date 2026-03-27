import { Users, Mail, Phone } from 'lucide-react';

interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
  description: string;
}

export default function TeamMemberCard({ name, role, image, description }: TeamMemberProps) {
  return (
    <div className="glass-card-hover tilt-3d group p-6 text-center hover:scale-105 transition-all duration-500">
      <div className="w-24 h-24 mx-auto mb-6 rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20 group-hover:scale-110 transition-transform duration-500">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover group-hover:brightness-110 transition-all duration-500"
        />
      </div>
      <h3 className="font-display text-xl font-bold text-foreground mb-2 gradient-text">{name}</h3>
      <p className="text-primary font-semibold mb-4 text-sm uppercase tracking-wide">"{role}"</p>
      <p className="text-muted-foreground mb-6 leading-relaxed">{description}</p>
      <div className="flex gap-3 justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button className="w-10 h-10 rounded-lg bg-primary/10 hover:bg-primary flex items-center justify-center transition-all duration-300 hover:scale-110">
          <Mail className="w-4 h-4" />
        </button>
        <button className="w-10 h-10 rounded-lg bg-primary/10 hover:bg-primary flex items-center justify-center transition-all duration-300 hover:scale-110">
          <Phone className="w-4 h-4" />
        </button>
        <button className="w-10 h-10 rounded-lg bg-accent/20 hover:bg-accent flex items-center justify-center transition-all duration-300 hover:scale-110">
          <Users className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
