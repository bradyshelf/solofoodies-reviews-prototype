import { useState } from 'react';
import { ArrowLeft, Globe, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const FoodieReviewsPage = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState('es');

  const translations = {
    es: {
      title: 'Mis Reseñas - Vista Foodie',
      totalReviews: 'Total de Reseñas',
      avgRating: 'Calificación Promedio',
      totalLikes: 'Likes Totales',
      totalViews: 'Visualizaciones',
      pending: 'Pendientes',
      completed: 'Completadas',
      noPending: 'No tienes reseñas pendientes',
      noCompleted: 'No has completado ninguna reseña aún',
      collaborations: 'Ver Colaboraciones'
    },
    en: {
      title: 'My Reviews - Foodie View',
      totalReviews: 'Total Reviews',
      avgRating: 'Average Rating',
      totalLikes: 'Total Likes',
      totalViews: 'Total Views',
      pending: 'Pending',
      completed: 'Completed',
      noPending: 'You have no pending reviews',
      noCompleted: 'You haven\'t completed any reviews yet',
      collaborations: 'View Collaborations'
    }
  };

  const t = translations[language as keyof typeof translations];

  const reviewStats = {
    total: 15,
    avgRating: 4.2,
    totalLikes: 1250,
    totalViews: 8500
  };

  const completedReviews = [
    {
      id: 1,
      restaurant: 'La Parrilla del Chef',
      date: '2024-01-15',
      rating: 5,
      likes: 45,
      comments: 12,
      image: '/lovable-uploads/26ce4d51-7cef-481d-8b86-af6c758c3760.png'
    },
    {
      id: 2,
      restaurant: 'Sushi Zen',
      date: '2024-01-10',
      rating: 4,
      likes: 32,
      comments: 8,
      image: '/lovable-uploads/26ce4d51-7cef-481d-8b86-af6c758c3760.png'
    }
  ];

  const pendingReviews = [
    {
      id: 3,
      restaurant: 'Café Central',
      dueDate: '2024-01-20',
      collaborationType: 'Review + Instagram Post',
      requirements: 'Publicar foto del plato principal y stories'
    }
  ];

  const handleBack = () => {
    navigate('/');
  };

  const handlePendingReviewClick = (reviewId: number) => {
    navigate(`/review/${reviewId}`);
  };

  const renderStars = (rating: number, size: 'sm' | 'md' | 'lg' = 'md') => {
    const sizeClasses = {
      sm: 'w-3 h-3',
      md: 'w-4 h-4',
      lg: 'w-5 h-5'
    };

    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizeClasses[size]} ${
              star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={handleBack}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <h1 className="text-lg font-semibold text-gray-900">{t.title}</h1>
          
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-16 border-none shadow-none">
              <Globe className="w-4 h-4" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="es">ES</SelectItem>
              <SelectItem value="en">EN</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{reviewStats.total}</div>
              <div className="text-sm text-gray-600">{t.totalReviews}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-1">
                <span className="text-2xl font-bold text-blue-600 mr-1">{reviewStats.avgRating}</span>
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              </div>
              <div className="text-sm text-gray-600">{t.avgRating}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{reviewStats.totalLikes}</div>
              <div className="text-sm text-gray-600">{t.totalLikes}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{reviewStats.totalViews}</div>
              <div className="text-sm text-gray-600">{t.totalViews}</div>
            </CardContent>
          </Card>
        </div>

        {/* Rating Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Distribución de Calificaciones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center space-x-2">
                  <span className="text-sm w-3">{rating}</span>
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${rating === 5 ? 60 : rating === 4 ? 25 : rating === 3 ? 10 : rating === 2 ? 3 : 2}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-8">
                    {rating === 5 ? '9' : rating === 4 ? '4' : rating === 3 ? '1' : rating === 2 ? '1' : '0'}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Reviews Tabs */}
        <Card>
          <CardContent className="p-0">
            <Tabs defaultValue="pending" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="pending">{t.pending}</TabsTrigger>
                <TabsTrigger value="completed">{t.completed}</TabsTrigger>
              </TabsList>
              
              <TabsContent value="pending" className="p-4 space-y-4">
                {pendingReviews.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="text-gray-400 text-lg mb-2">📝</div>
                    <p className="text-gray-600">{t.noPending}</p>
                  </div>
                ) : (
                  pendingReviews.map((review) => (
                    <Card key={review.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handlePendingReviewClick(review.id)}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-gray-900">{review.restaurant}</h3>
                          <Badge variant="outline" className="text-orange-600 border-orange-600">
                            Pendiente
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{review.collaborationType}</p>
                        <p className="text-sm text-gray-500 mb-2">{review.requirements}</p>
                        <p className="text-xs text-gray-400">Vence: {review.dueDate}</p>
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>
              
              <TabsContent value="completed" className="p-4 space-y-4">
                {completedReviews.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="text-gray-400 text-lg mb-2">⭐</div>
                    <p className="text-gray-600">{t.noCompleted}</p>
                  </div>
                ) : (
                  completedReviews.map((review) => (
                    <Card key={review.id}>
                      <CardContent className="p-4">
                        <div className="flex space-x-3">
                          <img
                            src={review.image}
                            alt={review.restaurant}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-1">{review.restaurant}</h3>
                            <div className="flex items-center space-x-2 mb-2">
                              {renderStars(review.rating, 'sm')}
                              <span className="text-sm text-gray-600">{review.rating}/5</span>
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span>{review.likes} likes</span>
                              <span>{review.comments} comentarios</span>
                              <span>{review.date}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Collaborations Button */}
        <Button 
          onClick={() => navigate('/collaborations')}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          {t.collaborations}
        </Button>
      </div>
    </div>
  );
};

export default FoodieReviewsPage;