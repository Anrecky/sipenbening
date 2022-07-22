<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Department extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'email',
        'phone',
        'address',
        'abbreviation'
    ];

    public function users()
    {
        return $this->hasMany(User::class);
    }
    public function conflictOfInterests()
    {
        return $this->hasMany(ConflictOfInterest::class);
    }

    public function scopeHighestConflictOfInterests($query, $date = null)
    {
        return match ($date) {
            'week', 'month', 'year' => $query->withCount(['conflictOfInterests' => fn (Builder $q) => $q->receivedDate($date)])->orderByDesc('conflict_of_interests_count')->first(),
            default => $query->withCount(['conflictOfInterests' => fn (Builder $q) => $q->receivedDate($date)])->orderByDesc('conflict_of_interests_count')->first()
        };
    }
}
