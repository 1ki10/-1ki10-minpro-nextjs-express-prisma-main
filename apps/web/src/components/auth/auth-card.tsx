interface AuthCardProps {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
  }
  
  export function AuthCard({ title, subtitle, children }: AuthCardProps) {
    return (
      <div className="bg-white rounded-xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">{title}</h1>
          {subtitle && (
            <p className="mt-2 text-gray-600">{subtitle}</p>
          )}
        </div>
        {children}
      </div>
    );
  }