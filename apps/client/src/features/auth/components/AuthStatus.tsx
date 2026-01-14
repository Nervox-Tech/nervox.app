import { Badge } from '@/shared/components/ui/badge';
import { useAuthStore } from '@/features/auth/store/useAuthStore';

export default function AuthStatus() {
  const { isAuthenticated, user, isLoading } = useAuthStore();

  if (isLoading) {
    return <Badge variant="outline">Loading...</Badge>;
  }

  return (
    <div className="flex items-center space-x-2">
      <Badge variant={isAuthenticated ? "default" : "destructive"}>
        {isAuthenticated ? "Authenticated" : "Not Authenticated"}
      </Badge>
      {user && (
        <Badge variant="outline">
          {user.email}
        </Badge>
      )}
    </div>
  );
}