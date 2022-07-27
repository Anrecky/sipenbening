<?php

namespace App\Http\Controllers;

use App\Models\Attachment;
use App\Models\ConflictOfInterest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ConflictOfInterestController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $request->validate([
            'title' => "required|unique:conflict_of_interests,title",
            "description" => "required|filled",
            "departmentId" => "required|integer",
            "categoryId" => "required|integer",
            "attachments" => "required",
            "attachments.*" => "mimes:csv,txt,xlx,xls,pdf,xlsx,ppt,png,jpg,jpeg"
        ]);

        $coi = ConflictOfInterest::create([
            "title" => $request->title,
            "description" => $request->description,
            "department_id" => $request->departmentId
        ]);
        $coi->categories()->attach($request->categoryId);

        $fileRes = [];

        if ($request->hasFile('attachments')) {
            foreach ($request->file('attachments') as $file) {
                $filename = $file->hashName();
                $path = "attachments/coi-{$coi->id}";
                Storage::putFileAs($path, $file, $filename);
                $attachment = Attachment::create([
                    "name" => $filename,
                    "extension" => $file->extension(),
                    "size" => number_format($file->getSize() / 1048576, 2) . " MB",
                    "path" => $path . "/$filename",
                    "conflict_of_interest_id" => $coi->id
                ]);
                array_push($fileRes, $attachment);
            }
        }

        return response()->json($fileRes);




        // return response()->json("Berhasil mengirim data!", 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\ConflictOfInterest  $conflictOfInterest
     * @return \Illuminate\Http\Response
     */
    public function show(ConflictOfInterest $conflictOfInterest)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\ConflictOfInterest  $conflictOfInterest
     * @return \Illuminate\Http\Response
     */
    public function edit(ConflictOfInterest $conflictOfInterest)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\ConflictOfInterest  $conflictOfInterest
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ConflictOfInterest $conflictOfInterest)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ConflictOfInterest  $conflictOfInterest
     * @return \Illuminate\Http\Response
     */
    public function destroy(ConflictOfInterest $conflictOfInterest)
    {
        //
    }
}
