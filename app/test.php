<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class test extends Model
{
    protected $table = 'crud';
    protected $primaryKey = 'name_id';
    protected $fillable = ['name_id', 'name', 'email'];

    public function validation()
    {
        return [

            'name'     => 'required',
            'email'    => 'required',
        ];
    }
}
