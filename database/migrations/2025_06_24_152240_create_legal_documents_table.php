<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('legal_documents', function (Blueprint $table) {
            $table->id();
            $table->enum('type', ['privacy_policy', 'terms_condition', 'cookie_policy', 'refund_policy'])
                  ->default('terms_condition');
            $table->string('version')->default('1.0');
            $table->boolean('is_active')->default(false);
            $table->date('effective_date')->nullable();
            $table->longText('content');
            $table->longText('content_short')->nullable();
            $table->string('language')->default('id');
            $table->foreignId('created_by')->nullable()->constrained('users');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down()
    {
        Schema::dropIfExists('legal_documents');
    }
};