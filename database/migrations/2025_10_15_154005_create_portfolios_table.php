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
            $table->foreignId('user_id')
                ->nullable()
                ->constrained('user')
                ->onDelete('cascade');
            $table->bigInteger('amount')->nullable();// مبلغی که از کیف پول برداشته میشه
            $table->integer('lever')->nullable();// تعداد خط معامله که الان 100 تاست هر خط 23,000 تومن
            $table->bigInteger('result')->nullable();// نتیجه معامله توش ریخته میشه وقتی پورتفو بسته میشه
            $table->enum('type' , ['cross' , 'isolated'])->default('cross');
            $table->enum('status' , ['open' , 'close'])->default('open');
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
