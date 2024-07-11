import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'libs/database.module';
import { UtilityImplement } from 'libs/utility.module';
import * as bcrypt from 'bcrypt';
import { Role } from '@prisma/client';

@Injectable()
export class TestService {
  @Inject()
  private readonly prisma: PrismaService;
  @Inject()
  private readonly util: UtilityImplement;

  async mockdata() {
    // User / Employee
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash('123456', salt);
    await Promise.all([
      this.prisma.user.create({
        data: {
          id: this.util.generateId(),
          username: 'user',
          password: hashPassword,
          fullname: 'Nguyen Van A',
          email: 'a@gmail.com',
          phone: '0111122222',
        },
      }),
      this.prisma.employee.create({
        data: {
          id: this.util.generateId(),
          username: 'receptionist',
          password: hashPassword,
          fullname: 'Nguyen Van B',
          email: 'receptionist@gmail.com',
          phone: '0222333444',
          role: Role.RECEPTIONIST,
        },
      }),
      this.prisma.employee.create({
        data: {
          id: this.util.generateId(),
          username: 'admin',
          password: hashPassword,
          fullname: 'Nguyen Van C',
          email: 'admin@gmail.com',
          phone: '0333444555',
          role: Role.ADMIN,
        },
      }),
    ]);

    //------------------------------------------------
    // Room Type
    const description =
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae, iusto nulla perspiciatis facilis atque, velit eaque nobis, magnam odit obcaecati eos ipsam dolorum explicabo quos totam a voluptatibus voluptas dolore. Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit non temporibus consectetur facilis magni similique neque, aut corrupti repudiandae aliquam quasi iste tenetur accusantium consequuntur ipsum, vel qui perferendis Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias rem quod fuga veniam nesciunt natus placeat cupiditate optio magni. Illo tempore nulla, iste reprehenderit quaerat consequuntur velit ducimus reiciendis sint.';
    const dataRoomType = [
      {
        id: this.util.generateId(),
        typeName: 'Single bedroom',
        amenities: [
          'Air-conditioner',
          'Wifi, TV, Netflix',
          'Garden view',
          'Fitness room',
          'Breakfast',
        ],
        introduction:
          'A cozy and comfortable space for solo travelers, equipped with all the necessary amenities for a relaxing stay.',
        description,
        size: 20,
        occupancy: 'Two adults',
        beds: 'One standard bed',
        bathrooms: 'Rain shower, hairdryer',
        price: 300000,
        imageUrls: [
          'https://i.ibb.co/Pr4W1H8/single-1.jpg',
          'https://i.ibb.co/G5yCDD8/single-2.jpg',
          'https://i.ibb.co/pxJkWKX/single-3.jpg',
          'https://i.ibb.co/5v3PLTz/single-4.jpg',
          'https://i.ibb.co/wWjhSGL/single-5.jpg',
        ],
        thumbnail: 'https://i.ibb.co/GtcrZH8/single-room.jpg',
      },
      {
        id: this.util.generateId(),
        typeName: 'Double bedroom',
        amenities: [
          'Air-conditioner',
          'Wifi, TV, Netflix',
          'Sofa, working desk',
          'Fitness room',
          'Breakfast',
          'Double vanities',
        ],
        introduction:
          'Perfect for couples or two guests, this room features a spacious layout with a double bed or twin beds and modern amenities.',
        description,
        size: 32,
        occupancy: 'Up to two adults and two children',
        beds: 'Two standard bed',
        bathrooms: 'Rain shower, separate marble tub, hairdryer',
        price: 500000,
        imageUrls: [
          'https://i.ibb.co/b3PW2WD/double-1.jpg',
          'https://i.ibb.co/71S0hcv/double-2.jpg',
          'https://i.ibb.co/xGDnjFp/double-3.jpg',
          'https://i.ibb.co/yXjCKSC/double-4.jpg',
        ],
        thumbnail: 'https://i.ibb.co/hX5WjqF/double-room.jpg',
      },
      {
        id: this.util.generateId(),
        typeName: 'Deluxe room',
        amenities: [
          'Air-conditioner',
          'Wifi, TV, Netflix',
          'Sofa, working desk',
          'Ocean view',
          'Fitness room',
          'Breakfast',
          'Double vanities',
          'Private pool',
          'Balcony with nice view',
          'Security safe',
        ],
        introduction:
          'Experience the epitome of luxury in our Deluxe Room, which offers an expansive space adorned with premium furnishings.',
        description,
        size: 32,
        occupancy: 'Two adults',
        beds: 'One king bed',
        bathrooms: 'Rain shower, separate marble tub, hairdryer',
        price: 800000,
        imageUrls: [
          'https://i.ibb.co/6m0ZFRh/deluxe-1.jpg',
          'https://i.ibb.co/9yJnHz8/deluxe-2.jpg',
          'https://i.ibb.co/LxCbcMk/deluxe-3.jpg',
          'https://i.ibb.co/LS6VGB1/deluxe-4.jpg',
          'https://i.ibb.co/Gdnj6Ss/deluxe-5.jpg',
        ],
        thumbnail: 'https://i.ibb.co/sFx6Bcb/deluxe-room.jpg',
      },
      {
        id: this.util.generateId(),
        typeName: 'Family room',
        amenities: [
          'Air-conditioner',
          'Wifi, TV, Netflix',
          'Sofa, working desk',
          'Ocean view',
          'Fitness room',
          'Breakfast',
          'Double vanities',
          'Private pool',
        ],
        introduction:
          'Our Family Room is perfect for those traveling with children, providing ample space and thoughtful amenities to ensure a pleasant stay for everyone.  Enjoy additional features like a small kitchenette and a cozy seating area, making it an ideal home away from home for your family.',
        description,
        size: 42,
        occupancy: 'Two adults',
        beds: 'One king bed',
        bathrooms: 'Rain shower, separate marble tub, hairdryer',
        price: 1000000,
        imageUrls: [
          'https://i.ibb.co/HY5h99G/family-1.jpg',
          'https://i.ibb.co/3sjYtwr/family-2.jpg',
          'https://i.ibb.co/yBRRs8X/family-3.jpg',
          'https://i.ibb.co/hdKJ9Gx/family-4.jpg',
          'https://i.ibb.co/g72P47b/family-5.jpg',
        ],
        thumbnail: 'https://i.ibb.co/ZgVsfGr/family-room.jpg',
      },
      {
        id: this.util.generateId(),
        typeName: 'Suite',
        amenities: [
          'Air-conditioner, Heater',
          'Wifi, OLED TV, Netflix',
          'Sofa, working desk',
          'Garden view',
          'Fitness room',
          'Premium breakfast',
          'Private pool',
          'Balcony with nice view',
          'Tea and coffee maker',
        ],
        introduction:
          'Indulge in the ultimate luxury with our spacious Suite, designed for those who appreciate the finer things in life. With panoramic views and sophisticated decor, our Suite offers an unparalleled experience of comfort and style.',
        description,
        size: 80,
        occupancy: 'Up to 6 people',
        beds: 'Three king beds',
        bathrooms: 'Rain shower, separate marble tub, hairdryer',
        price: 2000000,
        imageUrls: [
          'https://i.ibb.co/hs1Tcc0/suite-1.jpg',
          'https://i.ibb.co/0cwkd9n/suite-2.jpg',
          'https://i.ibb.co/VgkFFgC/suite-3.jpg',
          'https://i.ibb.co/hLjJkC7/suite-4.jpg',
          'https://i.ibb.co/5XZDfj9/suite-5.jpg',
        ],
        thumbnail: 'https://i.ibb.co/JQM2vYg/suite.jpg',
      },
      {
        id: this.util.generateId(),
        typeName: 'Penthouse',
        amenities: [
          'Air-conditioner, Heater',
          'Wifi, 8K OLED TV, Netflix, Spotify',
          'Sofa, working desk',
          'Ocean, garden view',
          'Fitness room',
          'Premium breakfast',
          'Private pool',
          'Balcony with nice view',
          'Tea and coffee maker',
          'Security safe',
          'Soundproof room',
        ],
        introduction:
          'Experience unrivaled luxury in our Penthouse, featuring breathtaking views, exquisite decor, and exceptional amenities for the ultimate in comfort and elegance. Enjoy exclusive privacy and top-tier service in our Penthouse, designed to provide a sophisticated retreat for the discerning traveler.',
        description,
        size: 120,
        occupancy: 'Up to 10 people',
        beds: 'Four king beds',
        bathrooms:
          'Rain shower, separate marble tub, pink hairdryer, music player',
        price: 5000000,
        imageUrls: [
          'https://i.ibb.co/gMvbSzN/penthouse-1.jpg',
          'https://i.ibb.co/XXnY5Pq/penthouse-2.jpg',
          'https://i.ibb.co/vVLqfYN/penthouse-3.jpg',
          'https://i.ibb.co/34n30ch/penthouse-4.jpg',
          'https://i.ibb.co/2W7JbjB/penthouse-5.jpg',
        ],
        thumbnail: 'https://i.ibb.co/DkMk70T/penthouse.jpg',
      },
    ];
    for (const roomType of dataRoomType) {
      await this.prisma.roomType.create({ data: roomType });
    }

    //------------------------------------------------
    // Service
    const dataServices = [
      {
        id: this.util.generateId(),
        serviceName: 'Spa',
        title: 'Relax and chill',
        introduction:
          'Our extensive range of spa treatments, including soothing massages, revitalizing facials, and aromatic therapies, is tailored to meet your unique needs. Escape the hustle and bustle of everyday life and indulge in our tranquil environment, where our skilled therapists are dedicated to enhancing your well-being and restoring your inner balance.',
        description,
        price: 1000000,
        thumbnail: 'https://i.ibb.co/LxffpQ7/spa-1.webp',
        imageUrls: [],
      },
      {
        id: this.util.generateId(),
        serviceName: 'Restaurant',
        title: 'Enjoy foods and drinks',
        introduction:
          "Delight your senses with exquisite dining experience at our restaurant. Enjoy a diverse menu featuring gourmet dishes crafted from the freshest ingredients, paired with an exceptional selection of wines and beverages. Whether you're indulging in a hearty breakfast, a leisurely lunch, or an elegant dinner, our culinary team is dedicated to providing a memorable dining experience that combines flavor, ambiance, and impeccable service.",
        description,
        price: 1000000,
        thumbnail: 'https://i.ibb.co/P41ZsKN/restaurant.webp',
        imageUrls: [],
      },
      {
        id: this.util.generateId(),
        serviceName: 'Gym',
        title: 'Have a healthy life',
        introduction:
          'Elevate your fitness journey in our state-of-the-art gym, designed to help you achieve your health and wellness goals. Our facility features a wide range of modern equipment, from cardio machines to free weights, catering to all fitness levels. Join our dynamic group classes or work with our professional trainers for personalized guidance and support.',
        description,
        price: 1000000,
        thumbnail: 'https://i.ibb.co/0ns8tJC/gym.webp',
        imageUrls: [],
      },
      {
        id: this.util.generateId(),
        serviceName: 'Pet care',
        title: 'We love your pets',
        introduction:
          'Ensure your pets live a healthy and happy life with our comprehensive pet care services. Our experienced team provides a wide range of services, including routine check-ups, vaccinations, grooming, and specialized treatments. We are dedicated to delivering the highest quality care for your furry companions, ensuring they receive the attention and love they deserve in a safe and nurturing environment.',
        description,
        price: 1000000,
        thumbnail: 'https://i.ibb.co/gdVt8J8/pet.jpg',
        imageUrls: [],
      },
    ];
    for (const service of dataServices) {
      await this.prisma.service.create({ data: service });
    }
  }
}
