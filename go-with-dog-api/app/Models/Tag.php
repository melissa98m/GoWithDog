<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    use HasFactory;
    protected $fillable = ['tag_name' , 'color'];

    public function ballades()
    {
        return $this->hasMany(Ballade::class);
    }
}
