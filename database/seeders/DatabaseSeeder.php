<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\User;
use App\Models\Department;
use App\Models\ConflictOfInterest;
use App\Models\Category;

use Carbon\Carbon;
use Illuminate\Support\Arr;
use Illuminate\Database\Eloquent\Factories\Sequence;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            DepartmentSeeder::class,
            UserSeeder::class,
            CategorySeeder::class
        ]);
        $departmentIds = Department::pluck('id')->toArray();
        User::factory(50)->create();
        $categoriesIds = Category::pluck('id')->toArray();
        ConflictOfInterest::factory()
            ->count(2579)
            ->state(new Sequence(
                fn ($sequence) => ['department_id' => Arr::random($departmentIds)]
            ))
            ->create()
            ->each(function ($coi) use ($categoriesIds) {
                $coi->categories()->attach([Arr::random($categoriesIds) => ["created_at" => Carbon::now()->format('Y-m-d H:i:s'), "updated_at" => Carbon::now()->format('Y-m-d H:i:s')]]);
            });
    }
}
