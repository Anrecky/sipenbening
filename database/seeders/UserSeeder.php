<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use Illuminate\Support\Facades\Hash;

use App\Models\User;
use Carbon\Carbon;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::insert(
            [
                [
                    "name" => "Bupati",
                    "role" => "boss",
                    "username" => "bupati_bangka_setara",
                    "email" => "egovdivisionbka@gmail.com",
                    "password" => Hash::make("BUPB4nGk4SetaraJaya!!%%"),
                    "department_id" => null,
                    'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                    'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
                ],
                [
                    "name" => "Wakil Bupati",
                    "username" => "wabup_bangka_setara",
                    "role" => "boss",
                    "email" => "egovdivisionbka2@gmail.com",
                    "password" => Hash::make("WABUPB4nGk4SetaraJaya!!%%"),
                    "department_id" => null,
                    'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                    'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
                ],
                [
                    "name" => "Sekda",
                    "username" => "sekda_bangka",
                    "role" => "boss",
                    "email" => "egovdivisionbka3@gmail.com",
                    "password" => Hash::make("S3kD4PB4nGk4SetaraJaya!!%%"),
                    "department_id" => null,
                    'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                    'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
                ],
                [
                    "name" => "Inspektorat",
                    "username" => "inspektorat_adm",
                    "role" => "manager",
                    "email" => "egovdivisionbka4@gmail.com",
                    "password" => Hash::make("Inspekt0r4tB4ngkaS3tara%%*"),
                    "department_id" => null,
                    'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                    'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
                ],
                [
                    "name" => "admin",
                    "role" => "admin",
                    "username" => "kominfo_egov_adm",
                    "email" => "egovdivisionbka100@gmail.com",
                    "password" => Hash::make("k0m1nfOEg0v*!*%%"),
                    "department_id" => null,
                    'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                    'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
                ]
            ]

        );
    }
}
