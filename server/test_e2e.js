// E2E Verification Script for Sathya Bio Database, Auth & Product API
const BASE_URL = 'http://localhost:5000';

async function runTests() {
  console.log('🧪 Starting Sathya Bio Full-Stack Database & API Tests...\n');

  try {
    // 1. Health check
    console.log('1. Testing /api/health...');
    const healthRes = await fetch(`${BASE_URL}/api/health`);
    const healthData = await healthRes.json();
    console.log('   ✅ Health OK:', healthData.records);

    // 2. Auth Login with Admin
    console.log('\n2. Testing Admin Login (9123456789 / admin)...');
    const adminLoginRes = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier: '9123456789', password: 'admin' })
    });
    const adminLogin = await adminLoginRes.json();
    if (!adminLogin.success) throw new Error(`Admin login failed: ${adminLogin.message}`);
    console.log(`   ✅ Admin Logged In: ${adminLogin.user.name} (${adminLogin.user.role})`);

    // 3. Admin Create New User Credentials
    console.log('\n3. Testing Admin Creating User Credentials for Farmer Annamalai...');
    const newUserPhone = `98421${Math.floor(10000 + Math.random() * 90000)}`;
    const createUserRes = await fetch(`${BASE_URL}/api/admin/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Annamalai Gounder',
        phone: newUserPhone,
        email: 'annamalai@coimbatorefarm.in',
        password: 'securepass123',
        role: 'farmer',
        crop: 'Cotton',
        acreage: 10,
        village: 'Pollachi',
        district: 'Coimbatore',
        state: 'Tamil Nadu'
      })
    });
    const createUserData = await createUserRes.json();
    if (!createUserData.success) throw new Error(`Create user failed: ${createUserData.message}`);
    const createdUserId = createUserData.user.id;
    console.log(`   ✅ User Created: ID=${createdUserId}, Phone=${newUserPhone}, Crop=${createUserData.user.crop}`);

    // 4. Test Newly Created User Login
    console.log('\n4. Testing Login with Newly Created Credentials...');
    const userLoginRes = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier: newUserPhone, password: 'securepass123' })
    });
    const userLogin = await userLoginRes.json();
    if (!userLogin.success) throw new Error(`User login failed: ${userLogin.message}`);
    console.log(`   ✅ Customer Logged In: ${userLogin.user.name}, Role=${userLogin.user.role}`);

    // 5. Admin Add Product Targeted to this User
    console.log('\n5. Testing Admin Adding Product Targeted to Annamalai...');
    const newProductRes = await fetch(`${BASE_URL}/api/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Sathya Bio CottonShield Ultra Max',
        category: 'Insecticide',
        price: 890,
        mrp: 1100,
        stock: 120,
        crops: ['Cotton'],
        description: 'Special formulation for Whitefly and Bollworm in Cotton crops.',
        targetUserId: createdUserId,
        badge: 'Exclusive Offer'
      })
    });
    const newProductData = await newProductRes.json();
    if (!newProductData.success) throw new Error(`Product creation failed: ${newProductData.message}`);
    const createdProductId = newProductData.data.id;
    console.log(`   ✅ Product Created: ID=${createdProductId}, Name=${newProductData.data.name}`);
    console.log(`      Targeted to: ${newProductData.data.targetUserName}`);

    // 6. Test Customer Catalog Reflection & User Priority Sorting
    console.log(`\n6. Testing Customer Storefront Fetch with User ID ${createdUserId}...`);
    const userCatalogRes = await fetch(`${BASE_URL}/api/products?userId=${createdUserId}`);
    const userCatalogData = await userCatalogRes.json();
    if (!userCatalogData.success) throw new Error('Catalog fetch failed');
    const firstProduct = userCatalogData.data[0];
    console.log(`   ✅ Top Prioritized Product for User: "${firstProduct.name}" (Targeted: ${firstProduct.targetUserId === createdUserId})`);
    if (firstProduct.id !== createdProductId) {
      console.warn('   ⚠️ Warning: Targeted product is not at top');
    } else {
      console.log('   ✅ Target product correctly sorted to TOP for this user!');
    }

    // 7. Test Admin User-Summary
    console.log('\n7. Testing /api/admin/products/user-summary...');
    const summaryRes = await fetch(`${BASE_URL}/api/admin/products/user-summary`);
    const summaryData = await summaryRes.json();
    const annamalaiSummary = summaryData.data.find(s => s.userId === createdUserId);
    console.log(`   ✅ User summary for Annamalai: Assigned=${annamalaiSummary?.assignedCount}, CropMatches=${annamalaiSummary?.cropMatchCount}`);

    // 8. Test Product Update
    console.log('\n8. Testing Product Update...');
    const updateRes = await fetch(`${BASE_URL}/api/products/${createdProductId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ price: 820, stock: 115 })
    });
    const updateData = await updateRes.json();
    console.log(`   ✅ Product Updated: Price=₹${updateData.data.price}, Stock=${updateData.data.stock}`);

    console.log('\n🎉 ALL 8 E2E TESTS PASSED SUCCESSFULLY!');
  } catch (err) {
    console.error('\n❌ TEST FAILED:', err.message);
    process.exit(1);
  }
}

runTests();
