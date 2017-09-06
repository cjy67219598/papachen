/**
 * Created by Administrator on 2017/8/30.
 */
let baseUrl = "/";
import $ from "jquery";
import iView from "iview";
export default {
    baseUrl,
    post(url,data){
        iView.LoadingBar.start();
        return new Promise((resolve,reject) => {
            $.ajax({
                method:"post",
                url:baseUrl + url,
                data:data,
                success(data){
                    try{
                        if(data.msg.status !== 1){
                            iView.LoadingBar.error();
                            iView.Message.error({
                                content:data.msg.result
                            });
                            reject(new Error(data.msg.result));
                        }else{
                            iView.LoadingBar.finish();
                            resolve(data);
                        }
                    }catch(err){
                        iView.LoadingBar.finish();
                        resolve(data);
                    }
                },
                error(err){
                    iView.LoadingBar.error();
                    iView.Message.error({
                        content:"网络出错"
                    });
                    reject(err);
                }
            });
        });
    },
    postNoErr(url,data){
        iView.LoadingBar.start();
        return new Promise((resolve,reject) => {
            $.ajax({
                method:"post",
                url:baseUrl + url,
                data:data,
                success(data){
                    iView.LoadingBar.finish();
                    resolve(data);
                },
                error(err){
                    iView.LoadingBar.error();
                    iView.Message.error({
                        content:"网络出错"
                    });
                    reject(err);
                }
            });
        });
    },
    tip(data){
        iView.Message.success({
            content:data.msg.result
        });
    }
}