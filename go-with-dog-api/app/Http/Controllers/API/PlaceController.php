<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Place;
use Illuminate\Http\Request;

class PlaceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $places = Place::with(['user', 'category' , 'address'])->get();
        return response()->json([
            'status' => 'Success',
            'data' => $places
        ]);
    }
    public function sortByDate(): JsonResponse
    {
        $places = Place::with(['user', 'category', 'address'])
            ->orderBy('created_at', 'desc')
            ->get();
        return response()->json([
            'status' => 'Success',
            'data' => $places
        ]);

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
            'place_name' => 'required|max:200',
            'place_description' => 'required',
            'user' => 'required',
            'category' => 'required',
            'address' => 'required',
        ]);
        $place = Place::create([
            'place_name' => $request->place_name,
            'place_description' => $request->place_description,
            'address' => $request->address,
            'category' => $request->category,
            'user' => $request->user,
        ]);

        $place->address = $place->address()->get()[0];
        $place->category = $place->category()->get()[0];
        $place->user = $place->user()->get()[0];
        return response()->json([
            'status' => 'Success',
            'data' => $place,
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Place  $place
     * @return \Illuminate\Http\Response
     */
    public function show(Place $place)
    {
        $place->load(['user']);
        $place->load(['category']);
        $place->load(['address']);
        return response()->json($place);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Place  $place
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Place $place)
    {
        $this->validate($request, [
            'place_name' => 'required|max:200',
            'place_description' => 'required',
            'user' => 'required',
            'category' => 'required',
            'address' => 'required',
        ]);
        $place->update([
            'place_name' => $request->place_name,
            'place_description' => $request->place_description,
            'address' => $request->address,
            'category' => $request->category,
            'user' => $request->user,
        ]);

        $place->address = $place->address()->get()[0];
        $place->category = $place->category()->get()[0];
        $place->user = $place->user()->get()[0];

        return response()->json([
            'status' => 'Mise à jour avec succèss',
            'data' => $place
        ]);
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Place  $place
     * @return \Illuminate\Http\Response
     */
    public function destroy(Place $place)
    {
        $place->delete();
        return response()->json([
            'status' => 'Supprimer avec succès'
        ]);
    }
}
