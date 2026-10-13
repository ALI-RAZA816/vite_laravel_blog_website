<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->string('site_title');
            $table->string('site_description');
            $table->string('site_copyright');
            $table->string('site_logo')->nullable();
            $table->string('f_url')->nullable();
            $table->string('t_url')->nullable();
            $table->string('i_url')->nullable();
            $table->string('l_url')->nullable();
            $table->string('site_maintence')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('settings');
    }
};
