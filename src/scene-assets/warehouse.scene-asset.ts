
import {
  createScenePrimitiveObject,
  Group,
  Mesh,
  MeshStandardMaterial,
} from '@iwsdk/core';

// Warehouse materials
const steelMaterial = new MeshStandardMaterial({
  color: '#315B78',
  roughness: 0.65,
  metalness: 0.35,
});

const beamMaterial = new MeshStandardMaterial({
  color: '#F0A52B',
  roughness: 0.7,
});

const shelfMaterial = new MeshStandardMaterial({
  color: '#9AA5AE',
  roughness: 0.8,
});

const cartonMaterials = [
  new MeshStandardMaterial({ color: '#C58B50', roughness: 0.95 }),
  new MeshStandardMaterial({ color: '#D6A66D', roughness: 0.95 }),
  new MeshStandardMaterial({ color: '#A96F3F', roughness: 0.95 }),
];

const palletMaterial = new MeshStandardMaterial({
  color: '#A8794D',
  roughness: 0.95,
});

// Create a rounded rectangular warehouse component.
function createBox(
  size: [number, number, number],
  material: MeshStandardMaterial,
): Mesh {
  return createScenePrimitiveObject(
    {
      geometry: {
        type: 'roundedBox',
        size,
        radius: 0.012,
        segments: 2,
      },
    },
    material,
  );
}

// Build one industrial storage rack.
function createStorageRack(): Group {
  const rack = new Group();

  const width = 2.5;
  const depth = 0.9;
  const height = 2.5;
  const postThickness = 0.075;

  // Four vertical steel supports.
  for (const x of [-width / 2, width / 2]) {
    for (const z of [-depth / 2, depth / 2]) {
      const post = createBox(
        [postThickness, height, postThickness],
        steelMaterial,
      );
      post.position.set(x, height / 2, z);
      rack.add(post);
    }
  }

  // Three shelf levels.
  const shelfHeights = [0.45, 1.25, 2.05];

  for (const y of shelfHeights) {
    const shelf = createBox(
      [width, 0.07, depth],
      shelfMaterial,
    );
    shelf.position.set(0, y, 0);
    rack.add(shelf);

    // Yellow front safety beam.
    const frontBeam = createBox(
      [width, 0.09, 0.07],
      beamMaterial,
    );
    frontBeam.position.set(0, y - 0.09, depth / 2);
    rack.add(frontBeam);
  }

  // Add cartons on the three shelf levels.
  shelfHeights.forEach((shelfY, level) => {
    for (let i = 0; i < 3; i += 1) {
      const carton = createBox(
        [0.48, 0.43, 0.48],
        cartonMaterials[(i + level) % cartonMaterials.length],
      );

      carton.position.set(
        -0.72 + i * 0.72,
        shelfY + 0.25,
        0,
      );

      rack.add(carton);
    }
  });

  return rack;
}

// Create a wooden pallet with cartons.
function createPallet(): Group {
  const pallet = new Group();

  const base = createBox(
    [1.15, 0.12, 0.9],
    palletMaterial,
  );
  base.position.y = 0.12;
  pallet.add(base);

  // Three supporting pallet runners.
  for (const x of [-0.4, 0, 0.4]) {
    const runner = createBox(
      [0.12, 0.12, 0.82],
      palletMaterial,
    );
    runner.position.set(x, 0.04, 0);
    pallet.add(runner);
  }

  // Cartons stacked on the pallet.
  const positions = [
    [-0.27, 0.43, -0.2],
    [0.27, 0.43, -0.2],
    [-0.27, 0.43, 0.2],
    [0.27, 0.43, 0.2],
    [0, 0.78, 0],
  ];

  positions.forEach((position, index) => {
    const carton = createBox(
      [0.42, 0.42, 0.36],
      cartonMaterials[index % cartonMaterials.length],
    );

    carton.position.set(
      position[0],
      position[1],
      position[2],
    );

    pallet.add(carton);
  });

  return pallet;
}

// Main warehouse environment.
export function createWarehouse(): Group {
  const warehouse = new Group();

  // Storage rack on the left.
  const leftRack = createStorageRack();
  leftRack.position.set(-1.7, 0, -2.5);
  warehouse.add(leftRack);

  // Storage rack on the right.
  const rightRack = createStorageRack();
  rightRack.position.set(1.7, 0, -2.5);
  warehouse.add(rightRack);

  // Pallet staging area.
  const pallet = createPallet();
  pallet.position.set(0, 0, -0.8);
  warehouse.add(pallet);

  return warehouse;
}
