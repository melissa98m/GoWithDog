<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\Contact as MailContact;

class ContactController extends Controller
{

    public function store(Request $request) {
        // Form validation
        $request->validate([
            'email' => 'required',
            'subject'=>'required',
            'contenu' => 'required'
        ]);

        $contact = Contact::create([ // Assigne les valeurs saisies dans le formulaire au champs correspondant dans la bd (création de la nouvelle opération)
            'email' => $request->email,
            'subject' => $request->subject,
            'contenu'=> $request->contenu,
        ]);

        Mail::to('melissa.mangione@gmail.com') //permet définir de qui est envoyé le mail
        ->send(new MailContact($contact));

        return response()->json([
            'status' => 'success'
        ]);
    }

}
