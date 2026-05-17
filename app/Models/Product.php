<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'user_id',
        'name',
        'slug',
        'category',
        'description',
        'price',
        'stock',
        'unit',
        'image',
        'is_available'
    ];

    public function seller() {
        return $this->belongsTo(User::class, 'user_id');
    }
}
