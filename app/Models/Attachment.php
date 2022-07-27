<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attachment extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'size', 'path', 'extension', 'conflict_of_interest_id'];

    public function conflictOfInterests()
    {
        return $this->belongsTo(ConflictOfInterest::class);
    }
}
