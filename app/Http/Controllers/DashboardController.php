<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use App\Models\ConflictOfInterest;
use App\Models\Department;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $role = Auth::user()->role;
        $startDate = $request->has('start_date') ? Carbon::createFromFormat('Y-m-d', $request->start_date)->startOfDay() : null;
        $endDate =  $request->has('end_date') ? Carbon::createFromFormat('Y-m-d', $request->end_date)->endOfDay() : null;
        $date = $request->route('date') ?? $request->date;

        $coiTotal = $startDate && $endDate ? ConflictOfInterest::whereBetween('date_received', [$startDate, $endDate])->count() : ($request->route('date') ? ConflictOfInterest::receivedDate($date)->count() : ConflictOfInterest::receivedDate()->count());
        $coiCompletedTotal = ConflictOfInterest::receivedDate($date)->completed()->count();
        $highestDepartmentCoi = $startDate && $endDate ? Department::select('name', 'abbreviation')->withCount(['conflictOfInterests' => fn (Builder $q) => $q->whereBetween('date_received', [$startDate, $endDate])])->orderByDesc('conflict_of_interests_count')->first() : Department::select('name', 'abbreviation')->highestConflictOfInterests($date);
        $highestCoiCategory = $startDate && $endDate ? Category::select('name')->withCount(['conflictOfInterests' => fn (Builder $q) => $q->whereBetween('date_received', [$startDate, $endDate])])->orderByDesc('conflict_of_interests_count')->first() : Category::select('name')->highestConflictOfInterests($date);

        if ($request->route('date')) {
            $lastCOITotal = ConflictOfInterest::receivedDate($date, true)->count();
            $percentCOITotal = $coiTotal !== 0 ? ((($coiTotal - $lastCOITotal) / $coiTotal) * 100) : 0;
            $coiTotalStatsDetail =  ["type" => "percent", "value" => $percentCOITotal];

            $coiLastCompletedTotal = ConflictOfInterest::receivedDate($date, true)->completed()->count();
            $percentCOICompletedTotal = $coiCompletedTotal !== 0 ? ((($coiCompletedTotal - $coiLastCompletedTotal) / $coiCompletedTotal) * 100) : 0;
            $coiCompletedTotalStatsDetail =  ["type" => "percent", "value" => $percentCOICompletedTotal];
        }

        $cardsStats = [
            ["statsTitle" => "Total Benturan Kepentingan", "statsValue" => $coiTotal, "statsDetail" => (isset($coiTotalStatsDetail) ? $coiTotalStatsDetail : null)],
            ["statsTitle" => "Total Penyelesaian", "statsValue" => $coiCompletedTotal, "statsDetail" => (isset($coiCompletedTotalStatsDetail) ? $coiCompletedTotalStatsDetail : null)],
            ["statsTitle" => "OPD Dengan Benturan Kepentingan Tertinggi", "statsValue" => $highestDepartmentCoi->conflict_of_interests_count, "statsDetail" => ["type" => "description", "value" => $highestDepartmentCoi?->abbreviation ? $highestDepartmentCoi?->abbreviation : $highestDepartmentCoi?->name]],
            ["statsTitle" => "Jenis Benturan Kepentingan Tertinggi", "statsValue" => $highestCoiCategory->conflict_of_interests_count, "statsDetail" => ["type" => "description", "value" => $highestCoiCategory->name]]
        ];

        $coiIsSelf = DB::table('conflict_of_interests')->selectRaw("is_self, DATE_FORMAT(date_received, '%Y-%m') AS new_date, COUNT(*) AS count")->whereRaw("date_received BETWEEN ? AND ?", [now()->subMonth(11), now()])->groupByRaw("is_self,new_date")->get();

        return inertia('Dashboard', [
            "cardsStats" => $cardsStats,
            "lineChartData" => $coiIsSelf
        ]);
    }
}
