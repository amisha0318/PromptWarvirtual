const { db } = require('./config/firebase');

const seedData = async () => {
  console.log('🌱 Starting Firestore Seed...');
  
  const venueId = 'stadium_1';
  
  // 1. Seed Areas for Heatmap
  const areas = [
    { id: 'area_north', name: 'North Entrance', currentOccupancy: 420, maxCapacity: 500, lat: 34.0522, lng: -118.2437 },
    { id: 'area_south', name: 'South Entrance', currentOccupancy: 150, maxCapacity: 500, lat: 34.0510, lng: -118.2430 },
    { id: 'area_concessions', name: 'Main Concessions', currentOccupancy: 800, maxCapacity: 1000, lat: 34.0515, lng: -118.2445 }
  ];

  for (const area of areas) {
    await db.collection('venues').doc(venueId).collection('areas').doc(area.id).set(area);
    console.log(`✅ Seeded area: ${area.id}`);
  }

  // 2. Seed Queues
  const queues = [
    { id: 'gate_a', name: 'Gate A Entry', currentPersonCount: 160, avgPeoplePerMinute: 8 },
    { id: 'gate_b', name: 'Gate B Entry', currentPersonCount: 40, avgPeoplePerMinute: 10 },
    { id: 'food_main', name: 'Central Food Court', currentPersonCount: 120, avgPeoplePerMinute: 5 }
  ];

  for (const queue of queues) {
    await db.collection('venues').doc(venueId).collection('queues').doc(queue.id).set(queue);
    console.log(`✅ Seeded queue: ${queue.id}`);
  }

  console.log('🚀 Seeding Complete!');
};

seedData().catch(err => console.error('❌ Seed Failed:', err));
