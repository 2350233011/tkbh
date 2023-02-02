<?php
namespace App\Imports;

use App\Models\User;
use Maatwebsite\Excel\Concerns\ToCollection;
use Illuminate\Support\Collection;

class UserImport implements ToCollection
{
    /**
     * 使用 ToCollection
     * @param array $row
     *
     * @return User|null
     */
    public function collection(Collection $rows)
    {
        foreach ($rows as $row)
        {
            // dump($row);
            // 处理数据
        }
        $data = "";
        User::insert($data);
    }

    public function createData($rows)
    {
        //todo
    }
}
