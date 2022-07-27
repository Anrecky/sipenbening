<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Arr;
use stdClass;
use Illuminate\Support\Carbon;

class ConflictOfInterestFactory extends Factory
{
    public function definition()
    {
        $date_received = $this->faker->dateTimeInInterval('-1 day', '-3 years');
        $date_finished = $this->faker->dateTimeInInterval((Carbon::parse($date_received)->subDays(1)), '-10 months');
        $randIsSelf = Arr::random(["yes", "no", 'unknown']);

        return [
            'title' => $this->faker->unique()->sentence(),
            'description' => $this->faker->text(),
            'date_received' => $date_received,
            'date_finished' => $date_finished,
            'identification' => $this->faker->text(),
            'evaluation' =>  $this->faker->text(),
            'recommendation' =>  $this->faker->text(),
            'is_self' => $randIsSelf,
            'completed' => $this->faker->boolean()
        ];
    }
}
