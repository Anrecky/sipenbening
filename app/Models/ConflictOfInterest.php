<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ConflictOfInterest extends Model
{
    use HasFactory;
    protected $casts = [
        'completed' => 'boolean',
    ];
    protected static function booted()
    {
        static::updating(function ($conflictOfInterest) {
            $conflictOfInterest->completed = $conflictOfInterest->is_self == false ? true : false;
        });
        static::created(function ($conflictOfInterest) {
            $conflictOfInterest->date_received = $conflictOfInterest->date_received ? $conflictOfInterest->date_received : now();
        });
    }
    public function department()
    {
        return $this->belongsTo(Department::class);
    }
    public function categories()
    {
        return $this->belongsToMany(Category::class);
    }
    public function scopeReceivedWeek($query, $last = false)
    {
        if ($last) return $query->whereBetween('date_received', [now()->subDays(14)->startOfDay(), now()->subDays(7)->endOfDay()]);
        return $query->whereBetween('date_received', [now()->subDays(7)->startOfDay(), now()->endOfDay()]);
    }
    public function scopeReceivedMonth($query, $last = false)
    {
        if ($last) return $query->whereBetween('date_received', [now()->subMonthNoOverflow()->startOfMonth(), now()->subMonthNoOverflow()->endOfMonth()]);
        return $query->whereBetween('date_received', [now()->startOfMonth(), now()->endOfMonth()]);
    }
    public function scopeReceivedYear($query, $last = false)
    {
        if ($last) return $query->whereBetween('date_received', [now()->subYearNoOverflow()->startOfYear(), now()->subYearNoOverflow()->endOfYear()]);
        return $query->whereBetween('date_received', [now()->startOfYear(), now()->endOfYear()]);
    }
    public function scopeCompleted($query)
    {
        return $query->where('completed', true);
    }
    public function scopeReceivedDate($query, $date = null, $last = false)
    {
        return match ($date) {
            'week' => $query->receivedWeek($last),
            'month' =>  $query->receivedMonth($last),
            'year' => $query->receivedYear($last),
            default => $query
        };
    }
}
