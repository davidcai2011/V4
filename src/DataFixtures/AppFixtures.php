<?php

namespace App\DataFixtures;

use App\Factory\CustomerFactory;
use App\Factory\ProductFactory;
use App\Factory\UserFactory;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        // $product = new Product();
        // $manager->persist($product);


        CustomerFactory::createMany(10);
        ProductFactory::createMany(20);
//        UserFactory::createOne(
//            [
//                'email' => 'davidcai2011@gmail.com',
//                'roles' => ['ROLE_ADMIN']
//            ]
//        );
//        UserFactory::createOne(
//            [
//                'email' => 'info@remixxonline.de',
//                'roles' => ['ROLE_API_USER']
//            ]
//        );
//        UserFactory::createOne(
//            [
//                'email' => 'info@remixxonline.de',
//                'roles' => ['ROLE_API_USER']
//            ]
//        );

        $manager->flush();
    }
}
