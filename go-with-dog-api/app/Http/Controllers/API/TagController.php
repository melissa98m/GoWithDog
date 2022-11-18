<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\tag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TagController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $tags = DB::table('tags')
            ->get()
            ->toArray();
        return response()->json(['status' => 'Success', 'data' => $tags]);
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
            'tag_name' => 'required|max:50',
            'color' => 'required|max:10'
        ]);
        $tag = Tag::create([
            'tag_name' => $request->tag_name,
            'color' => $request->color,
        ]);
        return response()->json(['status' => 'Success', 'data' => $tag]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Tag  $tag
     * @return \Illuminate\Http\Response
     */
    public function show(Tag $tag)
    {
        return response()->json($tag);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Tag  $tag
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Tag $tag)
    {
        $this->validate($request, [
            'tag_name' => 'required|max:50',
            'color' => 'required|max:10'

        ]);
        $tag->update([
            'tag_name' => $request->tag_name,
            'color' =>$request->color,
        ]);
        return response()->json(['status' => 'Success', 'data' => $tag]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Tag  $tag
     * @return \Illuminate\Http\Response
     */
    public function destroy(Tag $tag)
    {
        $tag->delete();
        return response()->json(['status' => 'Supprimer avec succès']);
    }
}
