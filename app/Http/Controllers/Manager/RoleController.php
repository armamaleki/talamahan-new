<?php

namespace App\Http\Controllers\Manager;

use App\Http\Controllers\Controller;
use App\Http\Resources\Manager\Role\RoleCollection;
use App\Http\Resources\Manager\Role\RoleResource;
use http\Env\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    public function index()
    {
        $roleList = Role::all();
        return Inertia::render('manager/role/index', [
            'roleList' => new RoleCollection($roleList)
        ]);
    }

    public function create()
    {
        return Inertia::render('manager/role/create');
    }

    public function store(Request $request)
    {

    }

    public function show(Role $role)
    {

    }

    public function edit(Role $role)
    {
        return Inertia::render('manager/role/edit', [
            'role' => new RoleResource($role)
        ]);
    }

    public function update(Request $request, Role $role)
    {

    }

    public function destroy(Role $role)
    {

    }
}
