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
        Schema::create('trades', function (Blueprint $table) {
            $table->id();
            $table->foreignId('portfolio_id')->nullable()->constrained('portfolios')->onDelete('cascade'); //هر ترید به یک پورتفو وصله
            $table->foreignId('user_id')->nullable()->constrained('user')->onDelete('cascade'); // هر ترید به یک کاربر وصله
            $table->enum('type', ['sale', 'purchase'])->default('purchase'); // نوع ترید
            $table->integer('start')->nullable(); // قیمت شروع معامله
            $table->integer('end')->nullable(); // قیمت پایان معامله
            $table->integer('profit_limit')->nullable(); // حد سود
            $table->integer('loss_limit')->nullable(); // حد زرر
            $table->enum('status', ['open', 'close'])->default('open'); // نوع ترید
            $table->foreignId('start_id')->nullable()->constrained('trades')->onDelete('cascade'); //از کی خریده این ینی چی ؟؟
            $table->foreignId('end_id')->nullable()->constrained('trades')->onDelete('cascade');//به کی فروخته
            $table->softDeletes();
            $table->timestamps();
            $table->index(['type', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('trades');
    }
};
