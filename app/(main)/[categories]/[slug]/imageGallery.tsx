import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type PostImage = { id: string; image_url: string };

const ImageGallery = ({
  images,
  alt,
}: {
  images: PostImage[];
  alt: string;
}) => {
  return (
    <Carousel className="w-full max-w-48 sm:max-w-xs">
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={image.id}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <img
                    src={image.image_url}
                    alt={`${alt} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {images.length > 1 && (
        <>
          <CarouselPrevious />
          <CarouselNext />
        </>
      )}
    </Carousel>
  );
};

export default ImageGallery;
