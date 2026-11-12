import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { publicOfferUrl } from '@/lib/publicOfferUrl';

// Παλιός σύνδεσμος /offers/:token — στέλνει στην ασφαλή δημόσια σελίδα προσφοράς
// (backend function publicOffer), που ανοίγει μόνο με το μυστικό token, χωρίς σύνδεση.
export default function PublicOfferPage() {
  const { publicToken } = useParams();

  useEffect(() => {
    if (publicToken) {
      const { origin } = window.location;
      const isPreview = /localhost|127\.0\.0\.1|base44/.test(window.location.hostname);
      const target = isPreview
        ? publicOfferUrl(publicToken)
        : `${origin}/functions/publicOffer?token=${encodeURIComponent(publicToken)}`;
      window.location.replace(target);
    }
  }, [publicToken]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-8 h-8 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
    </div>
  );
}
