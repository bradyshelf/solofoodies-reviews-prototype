
import { useState } from 'react';
import { ArrowLeft, Star, Languages, Eye, Heart, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ReviewsPage = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState<'es' | 'en'>('es');

  // Translation object
  const translations = {
    es: {
      title: "Rupo Benarroch",
      reviews: "Reviews",
      views: "Views", 
      likes: "Likes",
      toReview: "To review",
      yourReviews: "Your reviews",
      daysAgo: "d ago",
      more: "more",
      noReviews: "No hay reseñas pendientes",
      noReviewsDesc: "Completa colaboraciones para recibir invitaciones de reseña."
    },
    en: {
      title: "Rupo Benarroch",
      reviews: "Reviews",
      views: "Views",
      likes: "Likes", 
      toReview: "To review",
      yourReviews: "Your reviews",
      daysAgo: "d ago",
      more: "more",
      noReviews: "No pending reviews",
      noReviewsDesc: "Complete collaborations to receive review invitations."
    }
  };

  const t = translations[language];

  // Mock data for stats
  const stats = {
    reviews: 13,
    views: '2.7K',
    likes: 3
  };

  // Mock data for reviews to complete
  const reviewsToComplete = [
    {
      id: 1,
      restaurantName: "Restaurante Desde 1911",
      projectTitle: "Campaña Verano 2024",
      daysAgo: 20,
      collaborationDate: "2024-01-15"
    },
    {
      id: 2,
      restaurantName: "marmitón", 
      projectTitle: "Lanzamiento Menú Otoño",
      daysAgo: 24,
      collaborationDate: "2024-01-10"
    }
  ];

  // Mock data for completed reviews
  const completedReviews = [
    {
      id: 1,
      restaurantName: "Restaurante Desde 1911",
      rating: 5,
      review: "Si tuviese que elegir una última cena, sin duda sería en DESDE 1911 No te lo voy a explicar, porque no lo vas a entender... Tienes que ir y punto! Sin du...",
      daysAgo: 20,
      views: 267,
      likes: 0,
      showMore: true
    },
    {
      id: 2,
      restaurantName: "marmitón",
      rating: 5,
      review: "Lo mejor de la latina!!!Siempre siempre es un acierto",
      daysAgo: 24,
      views: 5,
      likes: 0
    },
    {
      id: 3,
      restaurantName: "Mi Compa Chava",
      rating: 5,
      review: "Maravilloso y creativo lugar!!! Me encantó probar algo distinto en México",
      date: "Apr 18, 2025",
      views: 402,
      likes: 0
    },
    {
      id: 4,
      restaurantName: "Joe's Pizza NYC",
      rating: 5,
      review: "Probando todo lo que mis panas me recomiendan, esta vez toco @JoesPizzaNYC Una pizza finita con muy buena base y buen crust ;)",
      date: "Feb 21, 2025",
      views: 0,
      likes: 0
    }
  ];

  const handleBack = () => {
    navigate('/');
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map(star => (
          <Star
            key={star}
            className={`w-4 h-4 ${star <= rating ? 'fill-[#FFC107] text-[#FFC107]' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-black px-4 py-4">
        <div className="flex items-center justify-between mb-6">
          <button onClick={handleBack} className="p-2 hover:bg-gray-800 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          
          <div className="flex items-center space-x-2">
            <Languages className="w-4 h-4 text-gray-400" />
            <Select value={language} onValueChange={(value: 'es' | 'en') => setLanguage(value)}>
              <SelectTrigger className="w-20 bg-gray-800 border-gray-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="es" className="text-white">ES</SelectItem>
                <SelectItem value="en" className="text-white">EN</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Profile Section */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-white">{t.title}</h1>
          <div className="w-16 h-16 rounded-full bg-gray-700 overflow-hidden">
            <img
              src="/lovable-uploads/26ce4d51-7cef-481d-8b86-af6c758c3760.png"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center space-x-8 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold">{stats.reviews}</div>
            <div className="text-gray-400 text-sm">{t.reviews}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{stats.views}</div>
            <div className="text-gray-400 text-sm">{t.views}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{stats.likes}</div>
            <div className="text-gray-400 text-sm">{t.likes}</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="your-reviews" className="w-full">
        <TabsList className="w-full bg-black border-b border-gray-800 rounded-none h-12">
          <TabsTrigger 
            value="to-review" 
            className="flex-1 text-gray-400 data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-white data-[state=active]:bg-transparent bg-transparent rounded-none"
          >
            {t.toReview}
          </TabsTrigger>
          <TabsTrigger 
            value="your-reviews"
            className="flex-1 text-gray-400 data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-white data-[state=active]:bg-transparent bg-transparent rounded-none"
          >
            {t.yourReviews}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="to-review" className="mt-0">
          <div className="px-4 py-4 space-y-4">
            {reviewsToComplete.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400 mb-2">{t.noReviews}</p>
                <p className="text-gray-500 text-sm">{t.noReviewsDesc}</p>
              </div>
            ) : (
              reviewsToComplete.map(review => (
                <Card key={review.id} className="bg-gray-900 border-gray-800">
                  <CardContent className="p-4">
                    <h3 className="font-medium text-white mb-2">{review.restaurantName}</h3>
                    <p className="text-gray-400 text-sm mb-2">{review.projectTitle}</p>
                    <p className="text-gray-500 text-xs">{review.daysAgo}{t.daysAgo}</p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="your-reviews" className="mt-0">
          <div className="px-4 py-4 space-y-4">
            {completedReviews.map(review => (
              <div key={review.id} className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-white">{review.restaurantName}</h3>
                  <Trash2 className="w-4 h-4 text-gray-500" />
                </div>
                
                <div className="flex items-center space-x-2">
                  {renderStars(review.rating)}
                  <span className="text-gray-400 text-sm">
                    · {review.daysAgo ? `${review.daysAgo}${t.daysAgo}` : review.date}
                  </span>
                </div>
                
                <p className="text-white text-sm leading-relaxed">
                  {review.review}
                  {review.showMore && (
                    <span className="text-gray-400 ml-1">{t.more}</span>
                  )}
                </p>
                
                <div className="flex items-center space-x-4 text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span className="text-sm">{review.views}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Heart className="w-4 h-4" />
                    <span className="text-sm">{review.likes}</span>
                  </div>
                </div>
                
                {review.id !== completedReviews[completedReviews.length - 1].id && (
                  <div className="border-b border-gray-800 pt-4"></div>
                )}
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReviewsPage;
