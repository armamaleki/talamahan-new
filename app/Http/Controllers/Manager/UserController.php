<?php

namespace App\Http\Controllers\Manager;

use App\Http\Controllers\Controller;
use App\Http\Requests\Manager\User\StoreUserRequest;
use App\Http\Resources\Manager\User\UserCollection;
use App\Http\Resources\Manager\User\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $usersData = User::paginate(10);
        return Inertia::render('manager/user/index', [
            'usersList' => new UserCollection($usersData),
        ]);

    }

    public function create()
    {
        return Inertia::render('manager/user/create');
    }

    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();
        $create =User::create($data);
        if ($create) {
            return to_route('manager.user.index')->with('success', 'User created successfully.');
        }else{
            return to_route('manager.user.index')->with('error', 'Something went wrong.');
        }
    }

    public function show(User $user)
    {
        return Inertia::render('manager/user/show', [
            'user' => new UserResource($user),
        ]);
    }


    public function edit(User $user)
    {

    }

    public function update(Request $request, User $user)
    {

    }

    public function destroy(User $user)
    {

    }
}
