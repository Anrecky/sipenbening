<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('conflict_of_interests', function (Blueprint $table) {
            $table->id();
            $table->string('title')->unique();
            $table->text('description');
            $table->enum('is_self', ["yes", "no", 'unknown'])->default('unknown');
            $table->boolean('completed')->default(false);
            $table->dateTime('date_received');
            $table->dateTime('date_finished')->nullable();
            $table->text('identification')->nullable();
            $table->json('evaluation_recommendation')->nullable();
            $table->foreignId('department_id')->constrained()->onUpdate('cascade')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('conflict_of_interests');
    }
};
