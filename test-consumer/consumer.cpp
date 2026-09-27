#include <addon-tools.hpp>


JS_METHOD(ping) {
	NAPI_ENV;
	RET_NUM(123);
}


Napi::Object init(Napi::Env env, Napi::Object exports) {
	exports.Set("ping", Napi::Function::New(env, ping));
	return exports;
}


NODE_API_MODULE(consumer, init)
