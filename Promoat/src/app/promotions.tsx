// pages/promotions.tsx
import Link from 'next/link';


const PromotionsPage = () => {
  return (
    <div>
      <h1>Promotions Page</h1>
      <p>Welcome to the promotions section!</p>
      <p>Here you can see all ongoing promotions.</p>

      {/* Example link to another route */}
      <Link href="/new-page">
        <a>Go to New Page</a>
      </Link>
    </div>
  );
};

export default PromotionsPage;
