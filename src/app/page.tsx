import HomeHeader from '@/components/home/HomeHeader';
import SearchBar from '@/components/home/SearchBar';
import CategoryChips from '@/components/home/CategoryChips';
import PromoBanner from '@/components/home/PromoBanner';
import FeaturedProducts from '@/components/home/FeaturedProducts';

export default function HomePage() {
  return (
    <div className="page-container">
      <HomeHeader />
      <SearchBar />
      <CategoryChips />
      <PromoBanner />
      <FeaturedProducts />
    </div>
  );
}

