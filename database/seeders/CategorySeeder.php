<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Category::insert(
            [
                [
                    "name" => "Gratifikasi",
                    "description" => "Jenis Benturan Kepentingan Gratifikasi",
                    'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                    'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
                ],
                [
                    "name" => "Penggunaan Aset (BMN)",
                    "description" => "Jenis Benturan Kepentingan Penggunaan Aset (BMN)",
                    'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                    'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
                ],
                [
                    "name" => "Rahasia Jabatan/Instansi",
                    "description" => null,
                    'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                    'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
                ],
                [
                    "name" => "Perangkapan Jabatan",
                    "description" => "Jenis Benturan Kepentingan Perangkapan Jabatan",
                    'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                    'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
                ],
                [
                    "name" => "Rekrutmen Pegawai",
                    "description" => null,
                    'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                    'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
                ],
                [
                    "name" => "Penyalahgunaan Jabatan",
                    "description" => "Jenis Benturan Kepentingan Penyalahgunaan Jabatan",
                    'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                    'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
                ],
                [
                    "name" => "Pengawasan Tidak Prosedur",
                    "description" => "Jenis Benturan Kepentingan Pengawasan Tidak Prosedur",
                    'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                    'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
                ]
            ]
        );
    }
}
