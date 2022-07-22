<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Department;
use Faker\Factory;

class DepartmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = json_decode(file_get_contents(__DIR__ . '/department.json'));
        $faker = Factory::create();
        foreach ($data as $value) {
            $department = new Department;
            $department->name = $value->name;
            $department->address = $value->address;
            $department->phone = $value->phone;
            $department->email = $value->email;
            $department->abbreviation = $faker->company();
            $department->save();
        }
        return $data;
    }
}
