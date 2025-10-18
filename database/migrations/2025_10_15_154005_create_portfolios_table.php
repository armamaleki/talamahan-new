<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('portfolios', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->integer('amount')->nullable();// مبلغی که از کیف پول برداشته میشه
            $table->integer('lever')->nullable();// تعداد خط معامله که الان 100 تاست هر خط 23,000 تومن
            $table->integer('unit_purchase')->nullable();// واحد خرید
            $table->integer('unit_sales')->nullable();// واحد فروش
            $table->enum('type' , ['a' , 'b'])->default('a');
            $table->enum('status' , ['open' , 'close' , 'wait'])->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('portfolios');
    }
};
