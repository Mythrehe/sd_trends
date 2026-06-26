"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ProductCard from '../../components/ProductCard/ProductCard';
import QuickView from '../../components/QuickView/QuickView';
import { PRODUCTS, Product } from '../../data/products';
import { ChevronRight, Grid, List, SlidersHorizontal, CheckSquare, Square, ChevronDown } from 'lucide-react';
import styles from './shop.module.css';

function ShopContent() {
  const searchParams = useSearchParams();
  const subcategoryParam = searchParams.get('subcategory');
  const categoryParam = searchParams.get('category');

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<string>('default');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [maxPrice, setMaxPrice] = useState<number>(5000);

  const itemsPerPage = 15;

  // Sync category counts from active product database
  const getCategoryCount = (categoryKey: string) => {
    if (categoryKey === 'all') return PRODUCTS.length;
    return PRODUCTS.filter(p => p.category === categoryKey).length;
  };

  const CATEGORIES = [
    { id: 'all', label: 'Our Store', count: getCategoryCount('all'), key: 'all' },
    { id: 'anklets', label: 'Anklet', count: getCategoryCount('anklets'), key: 'anklets' },
    { id: 'bracelets', label: 'Bracelets', count: getCategoryCount('bracelets'), key: 'bracelets' },
    { id: 'brooches', label: 'Brooches', count: getCategoryCount('brooches'), key: 'brooches' },
    { id: 'earrings', label: 'Earring', count: getCategoryCount('earrings'), key: 'earrings' },
    { id: 'rings', label: 'Rings', count: getCategoryCount('rings'), key: 'rings' },
    { id: 'necklaces', label: 'Necklaces', count: getCategoryCount('necklaces'), key: 'necklaces' }
  ];

  // Helper to map a subcategory name to its parent category key
  const getParentCategory = (sub: string): string => {
    const s = sub.toLowerCase();
    if (s.includes('ring')) return 'rings';
    if (s.includes('earring')) return 'earrings';
    if (s.includes('pendant') || s.includes('necklace') || s.includes('choker')) return 'necklaces';
    if (s.includes('bangle') || s.includes('bracelet') || s.includes('cuff')) return 'bracelets';
    if (s.includes('brooche')) return 'brooches';
    if (s.includes('ankle') || s.includes('anklet')) return 'anklets';
    return 'all';
  };

  // Helper to match subcategory names with product items
  const matchSubcategory = (product: Product, subcategory: string): boolean => {
    const name = product.name.toLowerCase();
    const desc = product.description.toLowerCase();
    const sub = subcategory.toLowerCase();

    if (!sub || sub === 'all') return true;

    // Rings
    if (sub === 'diamond rings') {
      return product.category === 'rings' && (name.includes('diamond') || desc.includes('diamond'));
    }
    if (sub === 'rose gold rings') {
      return product.category === 'rings' && (
        name.includes('rose') || 
        desc.includes('rose') || 
        (product.details.metal && product.details.metal.toLowerCase().includes('rose')) ||
        product.images.some(img => img.toLowerCase().includes('rose'))
      );
    }
    if (sub === 'gold rings') {
      return product.category === 'rings' && (
        (name.includes('gold') || desc.includes('gold') || (product.details.metal && product.details.metal.toLowerCase().includes('gold'))) &&
        !(
          name.includes('rose gold') || 
          desc.includes('rose gold') || 
          (product.details.metal && product.details.metal.toLowerCase().includes('rose gold')) ||
          name.includes('white gold') || 
          desc.includes('white gold') || 
          (product.details.metal && product.details.metal.toLowerCase().includes('white gold'))
        )
      );
    }
    if (sub === 'cocktail rings') {
      return product.category === 'rings' && (
        name.includes('cocktail') || 
        name.includes('emerald') || 
        desc.includes('emerald') || 
        name.includes('sinead') || 
        product.id.includes('emerald')
      );
    }

    // Anklets
    if (sub === 'ankle bracelets' || sub === 'beaded ankle' || sub === 'braided ankle' || sub === 'charmed ankle') {
      return product.category === 'anklets';
    }

    // Bracelets
    if (sub === 'antique bangle') {
      return product.category === 'bracelets' && (name.includes('bangle') || desc.includes('bangle'));
    }
    if (sub === 'beaded bracelets') {
      return product.category === 'bracelets' && (name.includes('beaded') || desc.includes('beaded') || name.includes('herringbone') || name.includes('flat'));
    }
    if (sub === 'charm bracelet') {
      return product.category === 'bracelets' && (name.includes('charm') || name.includes('cuff') || desc.includes('cuff'));
    }
    if (sub === 'tennis bracelets') {
      return product.category === 'bracelets' && (name.includes('tennis') || desc.includes('tennis'));
    }

    // Earring
    if (sub === 'dangles earring') {
      return product.category === 'earrings' && (name.includes('dangle') || name.includes('drop') || name.includes('ruby') || name.includes('ximena'));
    }
    if (sub === 'drops earring') {
      return product.category === 'earrings' && (name.includes('drop') || name.includes('ruby') || name.includes('ximena') || name.includes('eulla'));
    }
    if (sub === 'hoops earring') {
      return product.category === 'earrings' && (name.includes('hoop') || desc.includes('hoop'));
    }
    if (sub === 'mamuli earring') {
      return product.category === 'earrings' && (name.includes('mamuli') || name.includes('halo') || desc.includes('halo'));
    }

    // Brooches
    if (product.category === 'brooches') {
      return true;
    }

    // Necklaces
    if (sub === 'choker') {
      return product.category === 'necklaces' && (name.includes('choker') || desc.includes('choker'));
    }
    if (sub === 'butterfly pendant') {
      return product.category === 'necklaces' && (name.includes('butterfly') || name.includes('pendant') || desc.includes('pendant'));
    }
    if (sub === 'flower necklace') {
      return product.category === 'necklaces' && (name.includes('flower') || desc.includes('flower') || name.includes('tiara') || name.includes('duchess'));
    }
    if (sub === 'princess necklace') {
      return product.category === 'necklaces' && (name.includes('princess') || name.includes('tiara') || name.includes('duchess') || name.includes('sapphire'));
    }

    return name.includes(sub) || desc.includes(sub);
  };

  useEffect(() => {
    if (subcategoryParam) {
      setSelectedSubcategory(subcategoryParam);
      const parent = getParentCategory(subcategoryParam);
      setSelectedCategory(parent);
    } else if (categoryParam) {
      setSelectedCategory(categoryParam);
      setSelectedSubcategory(null);
    } else {
      setSelectedCategory('all');
      setSelectedSubcategory(null);
    }
  }, [subcategoryParam, categoryParam]);

  // Filtering logic
  const filteredProducts = PRODUCTS.filter(p => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesPrice = p.price <= maxPrice;
    
    let matchesSubcategory = true;
    if (selectedSubcategory) {
      matchesSubcategory = matchSubcategory(p, selectedSubcategory);
    }
    
    return matchesCategory && matchesPrice && matchesSubcategory;
  });

  // Sorting logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === 'price-asc') return a.price - b.price;
    if (sortOption === 'price-desc') return b.price - a.price;
    if (sortOption === 'rating') return b.rating - a.rating;
    return 0; // Default sorting
  });

  // Pagination bounds
  const totalProducts = sortedProducts.length;
  const totalPages = Math.ceil(totalProducts / itemsPerPage);
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Reset page when category, sorting, or price changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, sortOption, maxPrice, selectedSubcategory]);

  const handleCategorySelect = (categoryKey: string) => {
    setSelectedCategory(categoryKey);
    setSelectedSubcategory(null); // Clear subcategory when user selects a category manually
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header component */}
      <Header />

      {/* Main content flow */}
      <main style={{ flex: '1', backgroundColor: '#FFFFFF' }}>
        
        {/* Shop Header Banner */}
        <section className={styles.shopBanner}>
          <div className={styles.bannerOverlay}>
            <div className={styles.bannerContent}>
              <nav className={styles.breadcrumb} aria-label="Breadcrumb">
                <Link href="/">Home</Link>
                <ChevronRight size={12} className={styles.separator} />
                <span className={styles.activeCrumb}>Shop</span>
              </nav>
              <h1 className={styles.bannerTitle}>Shop</h1>
            </div>
          </div>
        </section>

        {/* Shop Main Layout */}
        <section className={styles.shopMain}>
          <div className={styles.container}>
            <div className={styles.shopLayoutGrid}>
              
              {/* Left Sidebar - Filters */}
              <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarOpen : ''}`}>
                <div className={styles.filterSection}>
                  <div 
                    className={styles.filterHeader}
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  >
                    <h2 className={styles.filterTitle}>Filter By Categories</h2>
                    <span className={styles.toggleIcon}>{isSidebarOpen ? '—' : '+'}</span>
                  </div>
                  
                  {isSidebarOpen && (
                    <ul className={styles.categoryList}>
                      {CATEGORIES.map((cat) => (
                        <li 
                          key={cat.id} 
                          className={`${styles.categoryItem} ${selectedCategory === cat.key ? styles.categoryActive : ''}`}
                          onClick={() => handleCategorySelect(cat.key)}
                        >
                          <div className={styles.checkboxWrapper}>
                            {selectedCategory === cat.key ? (
                              <CheckSquare size={18} className={styles.checkedIcon} />
                            ) : (
                              <Square size={18} className={styles.uncheckedIcon} />
                            )}
                          </div>
                          <span className={styles.categoryLabel}>{cat.label}</span>
                          <span className={styles.categoryCount}>({cat.count})</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Price Filter Section */}
                <div className={styles.filterSection} style={{ marginTop: '2.5rem' }}>
                  <h2 className={styles.filterTitle}>Filter By Price</h2>
                  <div className={styles.priceFilterContainer}>
                    <input 
                      type="range" 
                      min="0" 
                      max="5000" 
                      step="50"
                      value={maxPrice} 
                      onChange={(e) => setMaxPrice(Number(e.target.value))}
                      className={styles.priceSlider}
                      aria-label="Price range filter slider"
                    />
                    <div className={styles.priceRangeLabels}>
                      <span>$0</span>
                      <span>Max: ${maxPrice}</span>
                    </div>
                  </div>
                </div>
              </aside>

              {/* Right Side - Products Grid */}
              <div className={styles.catalogArea}>
                
                {/* Catalog Controls Header Bar */}
                <div className={styles.controlsHeader}>
                  <div className={styles.resultsCount}>
                    Showing {totalProducts === 0 ? 0 : indexOfFirstProduct + 1}–{Math.min(indexOfLastProduct, totalProducts)} of {totalProducts} results
                  </div>
                  
                  <div className={styles.displayOptions}>
                    {/* Sort Selector */}
                    <div className={styles.sortWrapper}>
                      <select 
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                        className={styles.sortSelect}
                        aria-label="Sort products dropdown"
                      >
                        <option value="default">Default sorting</option>
                        <option value="price-asc">Sort by price: low to high</option>
                        <option value="price-desc">Sort by price: high to low</option>
                        <option value="rating">Sort by popularity/rating</option>
                      </select>
                      <ChevronDown size={14} className={styles.selectChevron} />
                    </div>

                    {/* Grid/List Toggles */}
                    <div className={styles.viewToggles}>
                      <button 
                        onClick={() => setViewMode('grid')}
                        className={`${styles.toggleBtn} ${viewMode === 'grid' ? styles.toggleActive : ''}`}
                        aria-label="Grid layout view"
                      >
                        <Grid size={16} />
                      </button>
                      <button 
                        onClick={() => setViewMode('list')}
                        className={`${styles.toggleBtn} ${viewMode === 'list' ? styles.toggleActive : ''}`}
                        aria-label="List layout view"
                      >
                        <List size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Products Catalog Grid */}
                {currentProducts.length === 0 ? (
                  <div className={styles.noResults}>
                    <h3>No products found</h3>
                    <p>There are no products matching this category filter.</p>
                  </div>
                ) : (
                  <div className={`${styles.productsGrid} ${viewMode === 'list' ? styles.listView : ''}`}>
                    {currentProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                )}

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className={styles.pagination}>
                    {Array.from({ length: totalPages }).map((_, idx) => (
                      <button
                        key={idx}
                        className={`${styles.pageBtn} ${currentPage === idx + 1 ? styles.pageActive : ''}`}
                        onClick={() => setCurrentPage(idx + 1)}
                      >
                        {idx + 1}
                      </button>
                    ))}
                    {currentPage < totalPages && (
                      <button
                        className={styles.pageBtn}
                        onClick={() => setCurrentPage(prev => prev + 1)}
                      >
                        Next
                      </button>
                    )}
                  </div>
                )}

              </div>

            </div>
          </div>
        </section>

      </main>

      {/* Footer component */}
      <Footer />

      {/* Floating detail view dialog */}
      <QuickView />
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontFamily: 'var(--font-roboto), sans-serif' }}>
        Loading Shop...
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}
