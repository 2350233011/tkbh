<?php

namespace App\Http\Controllers;

use App\Imports\UserImport;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Http\Request;



class UserController extends Controller
{
    /**
     * excel批量导入成员
     *
     * @param Request $request
     * @return void
     */
    public function importExcel(Request $request)
    {
        //转为数组；$excelData = Excel::toArray(new UserImport, request()->file('excelfile'));
        //转为对象$excelData = Excel::toCollection(new UserImport, request()->file('excelfile'));
        $excelData = Excel::toArray(new UserImport, request()->file('excelfile'))[0];
        array_shift($excelData);

        //程序运行时间
        $startTime = explode(' ', microtime());
        //程序
        set_time_limit(0);
        try {
            //数组分块处理
            $chunck = collect($excelData);
            $chunks = $chunck->chunk(100);
            $chunks->all();
            foreach ($chunks as $val) {
                $arr = [];
                foreach ($val as $k => $value) {
                    //自定义数据库字段
                    $arr[$k]['model'] = $value[0];
                    $arr[$k]['number'] = $value[1];
                    $arr[$k]['sn'] = $value[2];
                    $arr[$k]['date'] = $value[3];
                }

                DB::table('tkbh_excel')->insert($arr);

            }

        } catch (\Exception $e) {
            dd("失败");
        }

        $endTime = explode(' ', microtime());
        $thisTime = round($endTime[0] + $endTime[1] - ($startTime[0] + $startTime[1]), 3);

        $res = array('code' => 1, 'time' => $thisTime, 'msg' => '上传成功');
        echo json_encode($res);
    }

    /**
     * 查询
     */
    public function excelsearch(Request $request)
    {
        $post = $request->input();
        $sn = $post['sn'];

        $user1 = DB::table("tkbh_excel")->where('sn', $sn)->first();

        if ($user1) {
            $user2 = DB::table("tkbh_excel")->where('sn', $sn)->get()->first();
            $res = array('code' => 1, 'msg' => '成功', 'data' => $user2);
        } else {
            $res = array('code' => 0, 'msg' => '不存在或输入错误', 'data' => "");
        }
        echo json_encode($res);
    }

}
