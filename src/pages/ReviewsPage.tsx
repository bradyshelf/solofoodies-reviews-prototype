
import { useState } from 'react';
import { ArrowLeft, Star, MessageSquare, TrendingUp, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ReviewsPage = () => {
  const navigate = useNavigate();
  
  // Mock data - in real app this would come from API
  const reviewStats = {
    averageRating: 4.7,
    totalReviews: 23,
    mostCommonRating: 5,
    ratingDistribution: {
      5: 15,
      4: 6,
      3: 2,
      2: 0,
      1: 0
    }
  };

  const reviews = [
    {
      id: 1,
      rating: 5,
      feedback: "Excelente colaboración! El contenido fue de muy alta calidad y se entregó a tiempo. Muy profesional.",
      projectTitle: "Campaña Verano 2024 - Restaurante La Moderna",
      reviewerName: "Restaurante La Moderna",
      reviewerType: "restaurant",
      date: "2024-01-15",
      tags: ["Profesional", "Puntual", "Gran Contenido"]
    },
    {
      id: 2,
      rating: 4,
      feedback: "Buena experiencia general. Las fotos quedaron muy bien, aunque hubo un pequeño retraso en la entrega.",
      projectTitle: "Lanzamiento Menú Otoño - Bistro Central",
      reviewerName: "Bistro Central",
      reviewerType: "restaurant", 
      date: "2024-01-10",
      tags: ["Creativo", "Buena Calidad"]
    },
    {
      id: 3,
      rating: 5,
      feedback: "Increíble trabajo! Las stories tuvieron un engagement altísimo y trajeron muchos clientes nuevos.",
      projectTitle: "Apertura Nueva Sucursal - Pizza Express",
      reviewerName: "Pizza Express",
      reviewerType: "restaurant",
      date: "2024-01-08",
      tags: ["Profesional", "Gran Alcance", "Resultados Excelentes"]
    }
  ];

  const handleBack = () => {
    navigate('/');
  };

  const renderStars = (rating: number, size: 'sm' | 'md' | 'lg' = 'md') => {
    const sizeClasses = {
      sm: 'w-3 h-3',
      md: 'w-4 h-4', 
      lg: 'w-5 h-5'
    };
    
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizeClasses[size]} ${
              star <= rating ? 'fill-[#FFC107] text-[#FFC107]' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center space-x-3">
          <button 
            onClick={handleBack}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Mis Reseñas</h1>
            <p className="text-sm text-gray-500">Todas las reseñas recibidas</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-white">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                {renderStars(Math.round(reviewStats.averageRating), 'sm')}
              </div>
              <div className="text-2xl font-bold text-[#E94E77]">
                {reviewStats.averageRating}
              </div>
              <div className="text-xs text-gray-500">Promedio</div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardContent className="p-4 text-center">
              <MessageSquare className="w-6 h-6 mx-auto mb-2 text-[#E94E77]" />
              <div className="text-2xl font-bold text-gray-900">
                {reviewStats.totalReviews}
              </div>
              <div className="text-xs text-gray-500">Total Reseñas</div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-6 h-6 mx-auto mb-2 text-[#FFC107]" />
              <div className="text-2xl font-bold text-gray-900">
                {reviewStats.mostCommonRating}
              </div>
              <div className="text-xs text-gray-500">Más Común</div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardContent className="p-4 text-center">
              <Award className="w-6 h-6 mx-auto mb-2 text-[#E94E77]" />
              <div className="text-2xl font-bold text-gray-900">
                {Math.round((reviewStats.ratingDistribution[5] / reviewStats.totalReviews) * 100)}%
              </div>
              <div className="text-xs text-gray-500">5 Estrellas</div>
            </CardContent>
          </Card>
        </div>

        {/* Rating Distribution */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Distribución de Calificaciones</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = reviewStats.ratingDistribution[rating as keyof typeof reviewStats.ratingDistribution];
              const percentage = (count / reviewStats.totalReviews) * 100;
              
              return (
                <div key={rating} className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1 w-16">
                    <span className="text-sm font-medium">{rating}</span>
                    <Star className="w-3 h-3 fill-[#FFC107] text-[#FFC107]" />
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-[#E94E77] h-2 rounded-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-8">{count}</span>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Reviews List */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Reseñas Recientes</h2>
          
          {reviews.map((review) => (
            <Card key={review.id} className="bg-white">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      {renderStars(review.rating)}
                      <span className="text-sm text-gray-500">
                        {new Date(review.date).toLocaleDateString('es-ES')}
                      </span>
                    </div>
                    <h3 className="font-medium text-gray-900 mb-1">
                      {review.projectTitle}
                    </h3>
                    <p className="text-sm text-gray-600 mb-1">
                      por {review.reviewerName}
                    </p>
                  </div>
                </div>
                
                {review.feedback && (
                  <p className="text-gray-700 mb-3 text-sm leading-relaxed">
                    "{review.feedback}"
                  </p>
                )}
                
                {review.tags && review.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {review.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-[#E94E77]/10 text-[#E94E77] text-xs rounded-full font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Reviews State (commented out since we have mock data) */}
        {/* {reviews.length === 0 && (
          <Card className="bg-white">
            <CardContent className="p-8 text-center">
              <Star className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Aún no tienes reseñas
              </h3>
              <p className="text-gray-500 mb-4">
                Completa tu primera colaboración para recibir reseñas de restaurantes.
              </p>
              <Button 
                onClick={() => navigate('/collaborations')}
                className="bg-[#E94E77] hover:bg-[#E94E77]/90"
              >
                Explorar Colaboraciones
              </Button>
            </CardContent>
          </Card>
        )} */}
      </div>
    </div>
  );
};

export default ReviewsPage;
