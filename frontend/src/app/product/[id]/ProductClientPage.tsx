"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import ProductCard from '../../../components/ProductCard/ProductCard';
import { useStore } from '../../../context/StoreContext';
import { PRODUCTS, Product } from '../../../data/products';
import { 
  Star, 
  Heart, 
  ShoppingBag, 
  ChevronRight, 
  Minus, 
  Plus,
  Flame,
  Eye,
  Check,
  Shuffle,
  HelpCircle,
  Share2,
  ShieldCheck,
  Coins,
  Truck
} from 'lucide-react';
import styles from './product.module.css';

interface ProductClientPageProps {
  productId: string;
}

export default function ProductClientPage({ productId }: ProductClientPageProps) {
  const router = useRouter();
  const { wishlist, toggleWishlist, addToCart } = useStore();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'reviews' | 'shipping'>('description');
  const [showStickyBar, setShowStickyBar] = useState(false);

  // Mock static-but-dynamic-looking sales & viewer counts
  const [soldCount, setSoldCount] = useState(14);
  const [viewerCount, setViewerCount] = useState(21);

  useEffect(() => {
    // Randomize slightly on load to look alive
    setSoldCount(Math.floor(Math.random() * 8) + 12);
    setViewerCount(Math.floor(Math.random() * 15) + 18);
  }, [productId]);

  useEffect(() => {
    async function getProduct() {
      try {
        const res = await fetch('http://localhost:5000/api/products');
        if (res.ok) {
          const data: Product[] = await res.json();
          const found = data.find(p => p.id === productId);
          if (found) {
            setProduct(found);
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        console.error("Backend fetch failed, searching locally:", err);
      }

      const localFound = PRODUCTS.find(p => p.id === productId);
      if (localFound) {
        setProduct(localFound);
      }
      setLoading(false);
    }
    
    getProduct();
  }, [productId]);

  // Scroll handler for sticky bottom checkout bar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 550) {
        setShowStickyBar(true);
      } else {
        setShowStickyBar(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <main style={{ flex: '1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '3px solid var(--border-color)',
            borderTopColor: 'rgb(206, 150, 126)',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
          <style jsx global>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <main style={{ flex: '1' }}>
          <div className={styles.errorWrapper}>
            <h1 className={styles.errorTitle}>Product Not Found</h1>
            <p className={styles.errorText}>
              We're sorry, but the jewelry piece you are looking for does not exist or has been removed.
            </p>
            <Link href="/" className={styles.errorLink}>
              Return to Homepage
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const isWishlisted = wishlist.includes(product.id);
  const discount = product.originalPrice > product.price 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  // Render stars based on rating
  const renderStars = (rating: number) => {
    const stars = [];
    const floorRating = Math.floor(rating);
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          size={16}
          fill={i <= floorRating ? "var(--accent-gold)" : "none"}
          stroke="var(--accent-gold)"
        />
      );
    }
    return stars;
  };

  const handleQtyMinus = () => {
    if (quantity > 1) setQuantity(prev => prev - 1);
  };

  const handleQtyPlus = () => {
    const maxStock = product.stock || 10;
    if (quantity < maxStock) setQuantity(prev => prev + 1);
  };

  const handleAddToCartSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addToCart(product, quantity);
  };

  const handleAddToCartClick = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    router.push('/checkout');
  };

  // Get suggested products: same category, excluding current product
  const suggestedProducts = PRODUCTS
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  // Fallback to fill suggestions grid to exactly 4 items
  if (suggestedProducts.length < 4) {
    const ids = new Set(suggestedProducts.map(p => p.id));
    ids.add(product.id);
    const extra = PRODUCTS.filter(p => !ids.has(p.id)).slice(0, 4 - suggestedProducts.length);
    suggestedProducts.push(...extra);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />

      <main style={{ flex: '1', backgroundColor: '#FFFFFF' }}>
        <div className={styles.container}>
          
          {/* Breadcrumb Navigation */}
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <ChevronRight size={12} className={styles.separator} />
            <Link href="/shop">Shop</Link>
            <ChevronRight size={12} className={styles.separator} />
            <span className={styles.activeCrumb}>{product.name}</span>
          </nav>

          {/* Product Details Section */}
          <div className={styles.productLayout}>
            
            {/* Left side: Double-column Gallery (thumbnails stack on left) */}
            <div className={styles.gallerySection}>
              {product.images.length > 1 && (
                <div className={styles.thumbnailStrip}>
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      className={`${styles.thumbnailBtn} ${activeImageIndex === idx ? styles.thumbnailActive : ''}`}
                      onClick={() => setActiveImageIndex(idx)}
                      aria-label={`View thumbnail ${idx + 1}`}
                    >
                      <img src={img} alt={`Thumbnail view ${idx + 1}`} />
                    </button>
                  ))}
                </div>
              )}
              
              <div className={styles.mainImageWrapper}>
                <img
                  src={product.images[activeImageIndex] || product.images[0]}
                  alt={product.name}
                  className={styles.mainImage}
                />
              </div>
            </div>

            {/* Right side: Product Metadata & Buy Form */}
            <div className={styles.detailsSection}>
              <div>
                <h1 className={styles.title}>{product.name}</h1>
              </div>

              <div className={styles.priceRow}>
                {product.priceRange ? (
                  <span className={styles.salePrice}>{product.priceRange}</span>
                ) : (
                  <>
                    <span className={styles.salePrice}>${product.price}</span>
                    {discount > 0 && (
                      <span className={styles.originalPrice}>${product.originalPrice}</span>
                    )}
                  </>
                )}
              </div>

              <div className={styles.ratingRow}>
                <div className={styles.stars}>{renderStars(product.rating)}</div>
                <span className={styles.reviewCount}>({product.reviewCount} reviews)</span>
              </div>

              {/* sold count with fire icon */}
              <div className={styles.fireTag}>
                <Flame size={16} className={styles.fireIcon} />
                <span>{soldCount} products sold in last 1 hour</span>
              </div>

              <p className={styles.description}>{product.description}</p>

              {/* stock count badge */}
              <div className={styles.stockRow}>
                <span className={styles.stockBadge}>
                  {product.stock > 0 ? `${product.stock + 200} in stock` : 'Out of stock'}
                </span>
              </div>

              {/* Action Form */}
              <form className={styles.actionForm} onSubmit={handleAddToCartSubmit}>
                <div className={styles.purchaseActions}>
                  <div className={styles.quantityWrapper}>
                    <button
                      type="button"
                      className={styles.qtyBtn}
                      onClick={handleQtyMinus}
                      disabled={quantity <= 1}
                      aria-label="Decrease quantity"
                    >
                      <Minus size={14} />
                    </button>
                    <span className={styles.qtyVal}>{quantity}</span>
                    <button
                      type="button"
                      className={styles.qtyBtn}
                      onClick={handleQtyPlus}
                      disabled={quantity >= (product.stock || 10)}
                      aria-label="Increase quantity"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  
                  <button
                    type="submit"
                    className={styles.addToCartBtn}
                    disabled={product.stock <= 0}
                  >
                    ADD TO CART
                  </button>
                </div>

                <button
                  type="button"
                  className={styles.buyNowBtn}
                  onClick={handleBuyNow}
                  disabled={product.stock <= 0}
                >
                  BUY NOW
                </button>
              </form>

              {/* Utility Row Links */}
              <div className={styles.utilityRow}>
                <button type="button" className={styles.utilityBtn}>
                  <Shuffle size={14} /> COMPARE
                </button>
                <button 
                  type="button" 
                  className={`${styles.utilityBtn} ${isWishlisted ? styles.utilityBtnActive : ''}`}
                  onClick={() => {
                    if (isWishlisted) {
                      router.push('/wishlist');
                    } else {
                      toggleWishlist(product.id);
                    }
                  }}
                >
                  <Heart size={14} fill={isWishlisted ? "currentColor" : "none"} /> {isWishlisted ? 'VIEW WISHLIST' : 'ADD TO WISHLIST'}
                </button>
                <button type="button" className={styles.utilityBtn}>
                  <HelpCircle size={14} /> ASK US
                </button>
                <button type="button" className={styles.utilityBtn}>
                  <Share2 size={14} /> SHARE
                </button>
              </div>

              {/* Viewer counter */}
              <div className={styles.eyeTag}>
                <Eye size={16} className={styles.eyeIcon} />
                <span>{viewerCount} people are viewing this right now</span>
              </div>

              {/* Delivery list */}
              <div className={styles.deliveryList}>
                <div className={styles.deliveryItem}>
                  <Check size={16} className={styles.checkIcon} />
                  <span>Estimated Delivery : Up to 4 business days</span>
                </div>
                <div className={styles.deliveryItem}>
                  <Check size={16} className={styles.checkIcon} />
                  <span>Free Shipping & Returns : On all orders over $200</span>
                </div>
              </div>

            </div>
          </div>

          {/* Trust Badges & Secure Checkout Row */}
          <div className={styles.trustCheckoutSection}>
            <div className={styles.trustBadgesGrid}>
              <div className={styles.trustBadge}>
                <ShieldCheck size={28} className={styles.trustIcon} />
                <span>101% Original</span>
              </div>
              <div className={styles.trustBadge}>
                <Coins size={28} className={styles.trustIcon} />
                <span>Lowest Price</span>
              </div>
              <div className={styles.trustBadge}>
                <Truck size={28} className={styles.trustIcon} />
                <span>Free Shipping</span>
              </div>
            </div>

            <div className={styles.checkoutBox}>
              <span className={styles.checkoutTitle}>Guaranteed Safe And Secure Checkout</span>
              <div className={styles.paymentBadges}>
                <div className={`${styles.paymentBadge} ${styles.visa}`}>Visa</div>
                <div className={`${styles.paymentBadge} ${styles.mastercard}`}>
                  <span className={styles.mcCircleRed}></span>
                  <span className={styles.mcCircleOrange}></span>
                  <span className={styles.paymentText}>mastercard</span>
                </div>
                <div className={`${styles.paymentBadge} ${styles.amex}`}>Amex</div>
                <div className={`${styles.paymentBadge} ${styles.discover}`}>Discover</div>
                <div className={`${styles.paymentBadge} ${styles.paypal}`}>PayPal</div>
                <div className={`${styles.paymentBadge} ${styles.applepay}`}> Pay</div>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className={styles.tabsSection}>
            <div className={styles.tabsNav}>
              <button 
                className={`${styles.tabBtn} ${activeTab === 'description' ? styles.tabBtnActive : ''}`}
                onClick={() => setActiveTab('description')}
              >
                Description
              </button>
              <button 
                className={`${styles.tabBtn} ${activeTab === 'reviews' ? styles.tabBtnActive : ''}`}
                onClick={() => setActiveTab('reviews')}
              >
                Reviews(1)
              </button>
              <button 
                className={`${styles.tabBtn} ${activeTab === 'shipping' ? styles.tabBtnActive : ''}`}
                onClick={() => setActiveTab('shipping')}
              >
                Shipping & Return
              </button>
            </div>

            <div className={styles.tabContent}>
              {activeTab === 'description' && (
                <div className={styles.descriptionTab}>
                  <h3 className={styles.aboutTitle}>About this item</h3>
                  <p className={styles.aboutText}>
                    Indulge in the allure of timeless elegance with our fine jewelry. Whether worn as a symbol of love, a celebration of achievements, or simply as a daily indulgence, this piece is a testament to enduring beauty and refined style. Arriving in an elegant signature jewelry box, it makes the perfect gift for a loved one or a treasured addition to your own collection. Each piece is accompanied by a certificate of authenticity, guaranteeing the highest quality of gemstones and gold purity.
                  </p>
                  <div className={styles.tabImageWrapper}>
                    <img 
                      src={product.images[1] || product.images[0]} 
                      alt={`${product.name} detail view`} 
                      className={styles.tabImage}
                    />
                  </div>
                </div>
              )}
              {activeTab === 'reviews' && (
                <div className={styles.reviewsTab}>
                  <h3 className={styles.aboutTitle}>Customer Review</h3>
                  <div className={styles.reviewCard}>
                    <div className={styles.reviewHeader}>
                      <div className={styles.reviewAuthor}>Clara M.</div>
                      <div className={styles.reviewStars}>{renderStars(5)}</div>
                    </div>
                    <p className={styles.reviewText}>
                      "Beautiful craftsmanship, my wife absolutely loved it! The gold is highly polished and the stones shine brilliantly in the light. Delivery was fast and came in a very premium box."
                    </p>
                  </div>
                </div>
              )}
              {activeTab === 'shipping' && (
                <div className={styles.shippingTab}>
                  <h3 className={styles.aboutTitle}>Shipping & Returns Policy</h3>
                  <ul className={styles.shippingList}>
                    <li><strong>Free Shipping:</strong> Free insured shipping worldwide on all orders.</li>
                    <li><strong>Estimated Delivery:</strong> Typically delivers in 3-5 business days. Tracking details will be emailed immediately.</li>
                    <li><strong>Returns Policy:</strong> Hassle-free 30-day returns. If you are not 100% satisfied, contact us for a full refund or exchange.</li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Suggested Products */}
          <div className={styles.suggestedSection}>
            <h2 className={styles.suggestedTitle}>Suggested Products</h2>
            <div className={styles.suggestedGrid}>
              {suggestedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>

        </div>
      </main>

      <Footer />

      {/* Sticky Bottom Checkout Bar */}
      <div className={`${styles.stickyBar} ${showStickyBar ? styles.stickyBarActive : ''}`}>
        <div className={styles.stickyContainer}>
          <div className={styles.stickyLeft}>
            <img 
              src={product.images[0]} 
              alt={product.name} 
              className={styles.stickyThumb} 
            />
            <span className={styles.stickyName}>{product.name}</span>
          </div>
          <div className={styles.stickyRight}>
            <span className={styles.stickyPrice}>${product.price}</span>
            
            <div className={styles.stickyQty}>
              <button 
                type="button" 
                className={styles.stickyQtyBtn}
                onClick={handleQtyMinus}
                disabled={quantity <= 1}
              >
                <Minus size={12} />
              </button>
              <span className={styles.stickyQtyVal}>{quantity}</span>
              <button 
                type="button" 
                className={styles.stickyQtyBtn}
                onClick={handleQtyPlus}
                disabled={quantity >= (product.stock || 10)}
              >
                <Plus size={12} />
              </button>
            </div>

            <button 
              type="button" 
              className={styles.stickyAddBtn}
              onClick={handleAddToCartClick}
              disabled={product.stock <= 0}
            >
              ADD TO CART
            </button>
            <button 
              type="button" 
              className={styles.stickyBuyBtn}
              onClick={handleBuyNow}
              disabled={product.stock <= 0}
            >
              BUY NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
