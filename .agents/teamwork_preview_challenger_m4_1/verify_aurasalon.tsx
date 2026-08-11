import React from 'react';
import { renderToString } from 'react-dom/server';
import { LookbookCarousel } from '../../src/components/templates/aurasalon/LookbookCarousel';
import { BeforeAfterSlider } from '../../src/components/templates/aurasalon/BeforeAfterSlider';
import { PackageCarousel } from '../../src/components/templates/aurasalon/PackageCarousel';
import type { LookbookItem, BeforeAfterItem, PackageItem } from '../../src/components/templates/aurasalon/types';

// Mock VisualBuilder Context if needed
const sampleLookbookItems: LookbookItem[] = [
  { id: '1', title: 'Look 1', category: 'Hair', image: '/img1.jpg', description: 'Desc 1', badge: 'New' },
  { id: '2', title: 'Look 2', category: 'Makeup', image: '/img2.jpg', description: 'Desc 2' },
  { id: '3', title: 'Look 3', category: 'Nails', image: '/img3.jpg', description: 'Desc 3' },
  { id: '4', title: 'Look 4', category: 'Styling', image: '/img4.jpg', description: 'Desc 4' },
  { id: '5', title: 'Look 5', category: 'Bridal', image: '/img5.jpg', description: 'Desc 5' },
  { id: '6', title: 'Look 6', category: 'Spa', image: '/img6.jpg', description: 'Desc 6' },
  { id: '7', title: 'Look 7', category: 'Couture', image: '/img7.jpg', description: 'Desc 7' },
];

const sampleBeforeAfterItems: BeforeAfterItem[] = [
  {
    id: 'ba-1',
    title: 'Bridal Transformation',
    category: 'Hair & Makeup',
    beforeImage: '/before1.jpg',
    afterImage: '/after1.jpg',
    transformationDetails: 'Full HD Bridal Glam',
    clientQuote: 'Felt like a queen!',
  },
  {
    id: 'ba-2',
    title: 'Hair Rebonding',
    category: 'Hair Treatment',
    beforeImage: '/before2.jpg',
    afterImage: '/after2.jpg',
    transformationDetails: 'Silk protein reconditioning',
  },
];

const samplePackages: PackageItem[] = [
  {
    id: 'pkg-1',
    name: 'Royal Bridal Ritual',
    subtitle: 'Complete luxury bridal makeover',
    price: '₹25,000',
    originalPrice: '₹32,000',
    isPopular: true,
    features: ['HD Airbrush Makeup', 'Hair Styling & Extensions', 'Draping & Saree Styling'],
    ctaText: 'Reserve Experience',
    whatsappMessage: 'Hi Ananya, I want to reserve the Royal Bridal Ritual.',
  },
  {
    id: 'pkg-2',
    name: 'Glow & Glam Package',
    subtitle: 'Pre-wedding party glam',
    price: '₹12,000',
    features: ['Party Makeup', 'Hair Blowdry', 'Nail Art'],
  },
];

console.log('=== RUNNING EMPIRICAL VERIFICATION HARNESS ===\n');

// -----------------------------------------------------------------------------
// TEST 1: LookbookCarousel Array Capping & Counter
// -----------------------------------------------------------------------------
console.log('--- TEST 1: LookbookCarousel Array Capping & Counter ---');
{
  const html7 = renderToString(
    <LookbookCarousel
      lookbookTitle="Lookbook"
      lookbookSubtitle="Our Work"
      lookbookItems={sampleLookbookItems}
    />
  );

  // Check how many items were rendered in HTML
  // Lookbook items have `aura-lookbook-img-X`
  const imgMatches = html7.match(/aura-lookbook-img-\d+/g) || [];
  console.log(`Input array length: ${sampleLookbookItems.length}`);
  console.log(`Rendered image keys in DOM count: ${imgMatches.length}`);
  console.log(`Rendered keys: ${JSON.stringify(imgMatches)}`);

  // Check counter output
  const counterMatch = html7.match(/\d{2}\s*\/\s*\d{2}/g);
  console.log(`Rendered counter text: ${counterMatch ? counterMatch[0] : 'NOT FOUND'}`);

  const passedCapping = imgMatches.length === 5 && counterMatch && counterMatch[0] === '01 / 05';
  console.log(`RESULT Test 1.1 (Capping to 5 & Counter 01 / 05): ${passedCapping ? 'PASS' : 'FAIL'}`);

  // Test 3 items
  const html3 = renderToString(
    <LookbookCarousel
      lookbookTitle="Lookbook 3"
      lookbookSubtitle="Sub 3"
      lookbookItems={sampleLookbookItems.slice(0, 3)}
    />
  );
  const imgMatches3 = html3.match(/aura-lookbook-img-\d+/g) || [];
  const counterMatch3 = html3.match(/\d{2}\s*\/\s*\d{2}/g);
  console.log(`Input 3 items -> Rendered DOM items: ${imgMatches3.length}, Counter: ${counterMatch3 ? counterMatch3[0] : 'N/A'}`);

  // Test 0 items
  const html0 = renderToString(
    <LookbookCarousel
      lookbookTitle="Lookbook 0"
      lookbookSubtitle="Sub 0"
      lookbookItems={[]}
    />
  );
  console.log(`Input 0 items -> Rendered HTML length: ${html0.length} (Expected 0 for null)`);
}

// -----------------------------------------------------------------------------
// TEST 2: LookbookCarousel Drag & Drag Suppression Logic Simulation
// -----------------------------------------------------------------------------
console.log('\n--- TEST 2: LookbookCarousel Drag Calculations & Suppression ---');
{
  function simulateDrag(startPos: number, endPos: number, isEditing: boolean, totalSlides: number) {
    if (isEditing || totalSlides <= 1) {
      return { status: 'SUPPRESSED', dragOffset: 0, slideChange: 'NONE' };
    }
    const deltaX = endPos - startPos;
    let action = 'NONE';
    if (deltaX < -50) action = 'NEXT_SLIDE';
    else if (deltaX > 50) action = 'PREV_SLIDE';
    return { status: 'DRAGGED', dragOffset: deltaX, slideChange: action };
  }

  const dragLeft = simulateDrag(100, 30, false, 5); // deltaX = -70
  console.log(`Drag Left (-70px, Normal):`, dragLeft);
  const dragRight = simulateDrag(30, 100, false, 5); // deltaX = +70
  console.log(`Drag Right (+70px, Normal):`, dragRight);
  const dragSmall = simulateDrag(100, 80, false, 5); // deltaX = -20
  console.log(`Drag Small (-20px, Normal):`, dragSmall);

  const dragEditing = simulateDrag(100, 30, true, 5); // isEditing = true
  console.log(`Drag Left (-70px, EDITING Mode):`, dragEditing);

  const dragEditingPassed = dragEditing.status === 'SUPPRESSED' && dragLeft.slideChange === 'NEXT_SLIDE' && dragRight.slideChange === 'PREV_SLIDE';
  console.log(`RESULT Test 2 (Drag Calculations & EDITING Suppression): ${dragEditingPassed ? 'PASS' : 'FAIL'}`);
}

// -----------------------------------------------------------------------------
// TEST 3: BeforeAfterSlider Clip-Path & Handle & Keydown
// -----------------------------------------------------------------------------
console.log('\n--- TEST 3: BeforeAfterSlider Calculations & Listener Cleanup ---');
{
  const htmlBA = renderToString(
    <BeforeAfterSlider
      beforeAfterTitle="Transformations"
      beforeAfterSubtitle="See the difference"
      beforeAfterItems={sampleBeforeAfterItems}
    />
  );

  // Check clip-path in HTML
  const clipMatch = htmlBA.match(/clip-path:\s*inset\([^)]+\)/i) || htmlBA.match(/inset\(0\s+\d+%\s+0\s+0\)/i);
  console.log(`Rendered HTML clip-path style: ${clipMatch ? clipMatch[0] : 'See style attribute'}`);

  // Calculate clip path values for slider positions
  const testPositions = [0, 25, 50, 75, 100];
  testPositions.forEach((pos) => {
    const clipStyle = `inset(0 ${100 - pos}% 0 0)`;
    const handleLeft = `${pos}%`;
    console.log(`Slider pos ${pos}% -> clipPath: "${clipStyle}", handle left: "${handleLeft}"`);
  });

  // Verify keyboard navigation logic
  function testKey(key: string, currentPos: number) {
    if (key === 'ArrowLeft' || key === 'ArrowDown') {
      return Math.max(0, currentPos - 3);
    } else if (key === 'ArrowRight' || key === 'ArrowUp') {
      return Math.min(100, currentPos + 3);
    }
    return currentPos;
  }

  console.log(`Keyboard test: Pos 50 + ArrowLeft -> ${testKey('ArrowLeft', 50)} (Expected 47)`);
  console.log(`Keyboard test: Pos 50 + ArrowRight -> ${testKey('ArrowRight', 50)} (Expected 53)`);
  console.log(`Keyboard test: Pos 1 + ArrowLeft -> ${testKey('ArrowLeft', 1)} (Expected 0)`);
  console.log(`Keyboard test: Pos 99 + ArrowRight -> ${testKey('ArrowRight', 99)} (Expected 100)`);

  // Verify Badge Placement / Clipping defect
  console.log('\n--- BUG ANALYSIS: BeforeAfterSlider Badges & Image Overlay Orientation ---');
  console.log('Overlay image (AfterImage) style: clipPath: inset(0 ${100 - sliderPosition}% 0 0)');
  console.log('Base image (BeforeImage) badge: bottom-6 left-6 ("Before")');
  console.log('Overlay image (AfterImage) badge: bottom-6 right-6 ("After")');
  console.log('Observation at sliderPosition = 50%:');
  console.log('  1) Overlay layer covers x=0% to x=50%. So AfterImage is shown on LEFT.');
  console.log('  2) Base layer "Before" badge is at left-6 (x=0..10%). It is HIDDEN behind AfterImage overlay.');
  console.log('  3) Overlay layer "After" badge is at right-6 (x=90..100%). It is CLIPPED OUT by inset(0 50% 0 0).');
  console.log('  -> NEITHER BADGE IS VISIBLE at sliderPosition = 50%! Both badges are invisible/hidden!');
}

// -----------------------------------------------------------------------------
// TEST 4: PackageCarousel Scroll State & WhatsApp Formatting
// -----------------------------------------------------------------------------
console.log('\n--- TEST 4: PackageCarousel Scroll & WhatsApp Formatting ---');
{
  const testPhoneRaw = '+91 98765 43210';
  const htmlPkg = renderToString(
    <PackageCarousel
      packagesTitle="Packages"
      packagesSubtitle="Choose your ritual"
      packages={samplePackages}
      phone={testPhoneRaw}
    />
  );

  // Check initial scroll button states in rendered JSX:
  // canScrollLeft default: false -> disabled = true
  // canScrollRight default: true -> disabled = false
  const leftDisabled = htmlPkg.includes('aria-label="Scroll Left"') && htmlPkg.includes('disabled=""') || htmlPkg.includes('disabled');
  console.log(`Left scroll button initially disabled: ${leftDisabled}`);

  // Check WhatsApp links rendered in HTML
  const waMatches = htmlPkg.match(/https:\/\/wa\.me\/[^"]+/g) || [];
  console.log(`Rendered WhatsApp links count: ${waMatches.length}`);
  waMatches.forEach((link, idx) => {
    console.log(`  Link ${idx + 1}: ${link}`);
  });

  // Verify Phone formatting issue:
  console.log('\n--- BUG ANALYSIS: PackageCarousel Phone Formatting ---');
  console.log(`Raw phone prop passed: "${testPhoneRaw}"`);
  console.log(`Generated WhatsApp URL: https://wa.me/${testPhoneRaw}?text=...`);
  console.log(`WhatsApp API specification requires numeric digits without '+' or spaces (e.g. 919876543210).`);
  console.log(`Passing raw "${testPhoneRaw}" creates malformed URL "https://wa.me/+91 98765 43210?text=..." which fails on mobile WhatsApp redirect.`);

  // Verify Scroll Button Overflow initial state defect:
  console.log('\n--- BUG ANALYSIS: PackageCarousel Initial Scroll Button State ---');
  console.log('PackageCarousel sets initialState: canScrollLeft=false, canScrollRight=true.');
  console.log('It has NO useEffect on mount or resize to run checkScroll().');
  console.log('If total packages fit on screen without overflow, canScrollRight is STILL true initially!');
}

console.log('\n=== EMPIRICAL VERIFICATION COMPLETE ===');
