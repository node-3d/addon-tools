#include <addon-tools.hpp>


class CrashProbe {
DECLARE_ES5_CLASS(CrashProbe, CrashProbe);

public:
	static void init(Napi::Env env, Napi::Object exports);
	explicit CrashProbe(const Napi::CallbackInfo &info) : _value(123) {
		super(info);
	}

private:
	int32_t _value;

	JS_DECLARE_METHOD(CrashProbe, ping);
};


IMPLEMENT_ES5_CLASS(CrashProbe);


void CrashProbe::init(Napi::Env env, Napi::Object exports) {
	Napi::Function ctor = wrap(env);
	JS_ASSIGN_METHOD(ping);
	exports.Set("CrashProbe", ctor);
}


JS_IMPLEMENT_METHOD(CrashProbe, ping) { NAPI_ENV;
	RET_NUM(_value);
}


static int32_t nonNullExternalValue = 123;


JS_METHOD(empty) { NAPI_ENV;
	NAPI_HS;
	RET_UNDEFINED;
}

JS_METHOD(throwing) { NAPI_ENV;
	JS_THROW("Some error");
	RET_UNDEFINED;
}

JS_METHOD(retUndefined) { NAPI_ENV;
	RET_UNDEFINED;
}

JS_METHOD(retNull) { NAPI_ENV;
	RET_NULL;
}

JS_METHOD(retStr) { NAPI_ENV;
	RET_STR("abcdef");
}

JS_METHOD(retNum) { NAPI_ENV;
	RET_NUM(12345);
}

JS_METHOD(retExt) { NAPI_ENV;
	RET_EXT(nullptr);
}

JS_METHOD(retExtNonNull) { NAPI_ENV;
	RET_EXT(&nonNullExternalValue);
}

JS_METHOD(setterExtRoundTrip) { NAPI_ENV;
	const Napi::Value &value = info[0];
	SETTER_EXT_ARG;
	RET_EXT(v);
}

JS_METHOD(retBool) { NAPI_ENV;
	RET_BOOL(true);
}

JS_METHOD(retObject) { NAPI_ENV;
	RET_VALUE(JS_OBJECT);
}

JS_METHOD(retArray) { NAPI_ENV;
	RET_VALUE(JS_ARRAY);
}

JS_METHOD(reqArgs3) { NAPI_ENV;
	REQ_ARGS(3);
	RET_BOOL(true);
}

JS_METHOD(isArg0Empty) { NAPI_ENV;
	RET_BOOL(IS_ARG_EMPTY(0));
}

JS_METHOD(reqStrArg) { NAPI_ENV;
	REQ_STR_ARG(0, arg);
	RET_STR(arg.c_str());
}

JS_METHOD(useStrArg) { NAPI_ENV;
	USE_STR_ARG(0, arg, "default");
	RET_STR(arg.c_str());
}

JS_METHOD(letStrArg) { NAPI_ENV;
	LET_STR_ARG(0, arg);
	RET_STR(arg.c_str());
}

JS_METHOD(weakStrArg) { NAPI_ENV;
	WEAK_STR_ARG(0, arg);
	RET_STR(arg.c_str());
}

JS_METHOD(reqIntArg) { NAPI_ENV;
	REQ_INT_ARG(0, arg);
	RET_NUM(arg);
}

JS_METHOD(useIntArg) { NAPI_ENV;
	USE_INT_ARG(0, arg, 10);
	RET_NUM(arg);
}

JS_METHOD(letIntArg) { NAPI_ENV;
	LET_INT_ARG(0, arg);
	RET_NUM(arg);
}

JS_METHOD(weakIntArg) { NAPI_ENV;
	WEAK_INT_ARG(0, arg);
	RET_NUM(arg);
}

JS_METHOD(reqUintArg) { NAPI_ENV;
	REQ_UINT_ARG(0, arg);
	RET_NUM(arg);
}

JS_METHOD(useUintArg) { NAPI_ENV;
	USE_UINT_ARG(0, arg, 10);
	RET_NUM(arg);
}

JS_METHOD(letUintArg) { NAPI_ENV;
	LET_UINT_ARG(0, arg);
	RET_NUM(arg);
}

JS_METHOD(weakUintArg) { NAPI_ENV;
	WEAK_UINT_ARG(0, arg);
	RET_NUM(arg);
}

JS_METHOD(reqInt64Arg) { NAPI_ENV;
	REQ_INT64_ARG(0, arg);
	RET_NUM(arg);
}

JS_METHOD(useInt64Arg) { NAPI_ENV;
	USE_INT64_ARG(0, arg, 10);
	RET_NUM(arg);
}

JS_METHOD(letInt64Arg) { NAPI_ENV;
	LET_INT64_ARG(0, arg);
	RET_NUM(arg);
}

JS_METHOD(weakInt64Arg) { NAPI_ENV;
	WEAK_INT64_ARG(0, arg);
	RET_NUM(arg);
}

JS_METHOD(reqUint64Arg) { NAPI_ENV;
	REQ_UINT64_ARG(0, arg);
	RET_NUM(arg);
}

JS_METHOD(useUint64Arg) { NAPI_ENV;
	USE_UINT64_ARG(0, arg, 10);
	RET_NUM(arg);
}

JS_METHOD(letUint64Arg) { NAPI_ENV;
	LET_UINT64_ARG(0, arg);
	RET_NUM(arg);
}

JS_METHOD(weakUint64Arg) { NAPI_ENV;
	WEAK_UINT64_ARG(0, arg);
	RET_NUM(arg);
}

JS_METHOD(reqBoolArg) { NAPI_ENV;
	REQ_BOOL_ARG(0, arg);
	RET_BOOL(arg);
}

JS_METHOD(useBoolArg) { NAPI_ENV;
	USE_BOOL_ARG(0, arg, true);
	RET_BOOL(arg);
}

JS_METHOD(letBoolArg) { NAPI_ENV;
	LET_BOOL_ARG(0, arg);
	RET_BOOL(arg);
}

JS_METHOD(softBoolArg) { NAPI_ENV;
	SOFT_BOOL_ARG(0, arg);
	RET_BOOL(arg);
}

JS_METHOD(weakBoolArg) { NAPI_ENV;
	WEAK_BOOL_ARG(0, arg);
	RET_BOOL(arg);
}

JS_METHOD(reqOffsArg) { NAPI_ENV;
	REQ_OFFS_ARG(0, arg);
	RET_NUM(arg);
}

JS_METHOD(useOffsArg) { NAPI_ENV;
	USE_OFFS_ARG(0, arg, 10);
	RET_NUM(arg);
}

JS_METHOD(letOffsArg) { NAPI_ENV;
	LET_OFFS_ARG(0, arg);
	RET_NUM(arg);
}

JS_METHOD(weakOffsArg) { NAPI_ENV;
	WEAK_OFFS_ARG(0, arg);
	RET_NUM(arg);
}

JS_METHOD(reqDoubleArg) { NAPI_ENV;
	REQ_DOUBLE_ARG(0, arg);
	RET_NUM(arg);
}

JS_METHOD(useDoubleArg) { NAPI_ENV;
	USE_DOUBLE_ARG(0, arg, 10);
	RET_NUM(arg);
}

JS_METHOD(letDoubleArg) { NAPI_ENV;
	LET_DOUBLE_ARG(0, arg);
	RET_NUM(arg);
}

JS_METHOD(weakDoubleArg) { NAPI_ENV;
	WEAK_DOUBLE_ARG(0, arg);
	RET_NUM(arg);
}

JS_METHOD(reqFloatArg) { NAPI_ENV;
	REQ_FLOAT_ARG(0, arg);
	RET_NUM(arg);
}

JS_METHOD(useFloatArg) { NAPI_ENV;
	USE_FLOAT_ARG(0, arg, 10);
	RET_NUM(arg);
}

JS_METHOD(letFloatArg) { NAPI_ENV;
	LET_FLOAT_ARG(0, arg);
	RET_NUM(arg);
}

JS_METHOD(weakFloatArg) { NAPI_ENV;
	WEAK_FLOAT_ARG(0, arg);
	RET_NUM(arg);
}

JS_METHOD(reqExtArg) { NAPI_ENV;
	REQ_EXT_ARG(0, arg);
	RET_EXT(arg);
}

JS_METHOD(useExtArg) { NAPI_ENV;
	USE_EXT_ARG(0, arg, nullptr);
	RET_EXT(arg);
}

JS_METHOD(letExtArg) { NAPI_ENV;
	LET_EXT_ARG(0, arg);
	RET_EXT(arg);
}

JS_METHOD(reqObjArg) { NAPI_ENV;
	REQ_OBJ_ARG(0, arg);
	RET_VALUE(arg);
}

JS_METHOD(useObjArg) { NAPI_ENV;
	USE_OBJ_ARG(0, arg, JS_OBJECT);
	RET_VALUE(arg);
}

JS_METHOD(letObjArg) { NAPI_ENV;
	LET_OBJ_ARG(0, arg);
	RET_VALUE(arg);
}

JS_METHOD(reqArrayArg) { NAPI_ENV;
	REQ_ARRAY_ARG(0, arg);
	RET_VALUE(arg);
}

JS_METHOD(useArrayArg) { NAPI_ENV;
	USE_ARRAY_ARG(0, arg, JS_ARRAY);
	RET_VALUE(arg);
}

JS_METHOD(letArrayArg) { NAPI_ENV;
	LET_ARRAY_ARG(0, arg);
	RET_VALUE(arg);
}

JS_METHOD(letArrayStrArg) { NAPI_ENV;
	LET_ARRAY_STR_ARG(0, arg);
	RET_ARRAY_STR(arg);
}

JS_METHOD(reqFunArg) { NAPI_ENV;
	REQ_FUN_ARG(0, arg);
	RET_VALUE(arg);
}

JS_METHOD(reqArrvArg) { NAPI_ENV;
	REQ_ARRV_ARG(0, arg);
	RET_VALUE(arg);
}

JS_METHOD(reqBufArg) { NAPI_ENV;
	REQ_BUF_ARG(0, arg);
	RET_VALUE(arg);
}

JS_METHOD(reqTypedArg) { NAPI_ENV;
	REQ_TYPED_ARRAY_ARG(0, arg);
	RET_VALUE(arg);
}

JS_METHOD(strcasestrProbe) { NAPI_ENV;
	char haystack[] = "AbCdEf";
	char needle[] = "Cd";
	const char *found = strcasestr_crossplatform(haystack, needle);
	Napi::Object result = JS_OBJECT;
	result.Set("haystack", haystack);
	result.Set("needle", needle);
	result.Set("index", found == nullptr ? -1 : static_cast<int32_t>(found - haystack));
	RET_VALUE(result);
}

JS_METHOD(getArrayDataUint32Meta) { NAPI_ENV;
	REQ_OBJ_ARG(0, arg);
	int32_t count = 0;
	const uint32_t *data = getArrayData<const uint32_t>(env, arg, &count);
	Napi::Object result = JS_OBJECT;
	uintptr_t address = reinterpret_cast<uintptr_t>(data);
	result.Set("count", count);
	result.Set("alignment", data == nullptr ? 0 : static_cast<double>(address % alignof(uint32_t)));
	RET_VALUE(result);
}

JS_METHOD(getDataPresence) { NAPI_ENV;
	REQ_OBJ_ARG(0, arg);
	const void *data = getData(env, arg);
	RET_BOOL(data != nullptr);
}

JS_METHOD(getBufferDataFloatMeta) { NAPI_ENV;
	REQ_OBJ_ARG(0, arg);
	int32_t count = 0;
	const float *data = getBufferData<const float>(env, arg, &count);
	Napi::Object result = JS_OBJECT;
	result.Set("count", count);
	result.Set("first", count > 0 ? data[0] : 0.f);
	RET_VALUE(result);
}

JS_METHOD(setBufferDataFloatFirst) { NAPI_ENV;
	REQ_OBJ_ARG(0, arg);
	REQ_FLOAT_ARG(1, nextValue);
	int32_t count = 0;
	float *data = getBufferData<float>(env, arg, &count);
	if (count < 1) {
		JS_THROW("Buffer does not contain a complete item of the requested type.");
		RET_UNDEFINED;
	}
	data[0] = nextValue;
	RET_NUM(data[0]);
}

JS_METHOD(consoleLogString) { NAPI_ENV;
	consoleLog(env, "test");
	RET_UNDEFINED;
}

JS_METHOD(consoleLogArgs) { NAPI_ENV;
	Napi::Value args[2] = { JS_STR("test"), JS_NUM(2) };
	consoleLog(env, 2, &args[0]);
	RET_UNDEFINED;
}

JS_METHOD(globalLogString) { NAPI_ENV;
	globalLog(env, "cpp", "info", "test");
	RET_UNDEFINED;
}

JS_METHOD(globalLogArgs) { NAPI_ENV;
	Napi::Value args[2] = { JS_STR("test"), JS_NUM(2) };
	globalLog(env, "cpp", "warn", 2, &args[0]);
	RET_UNDEFINED;
}


#define TEST_SET_METHOD(name)                                                 \
	exports.DefineProperty(                                                   \
		Napi::PropertyDescriptor::Function(env, exports, #name, name)         \
	);

Napi::Object init(Napi::Env env, Napi::Object exports) {
	TEST_SET_METHOD(empty);
	TEST_SET_METHOD(throwing);
	
	TEST_SET_METHOD(retUndefined);
	TEST_SET_METHOD(retNull);
	TEST_SET_METHOD(retStr);
	TEST_SET_METHOD(retNum);
	TEST_SET_METHOD(retExt);
	TEST_SET_METHOD(retExtNonNull);
	TEST_SET_METHOD(setterExtRoundTrip);
	TEST_SET_METHOD(retBool);
	TEST_SET_METHOD(retObject);
	TEST_SET_METHOD(retArray);
	
	TEST_SET_METHOD(reqArgs3);
	TEST_SET_METHOD(isArg0Empty);
	
	TEST_SET_METHOD(reqStrArg);
	TEST_SET_METHOD(useStrArg);
	TEST_SET_METHOD(letStrArg);
	TEST_SET_METHOD(weakStrArg);
	
	TEST_SET_METHOD(reqIntArg);
	TEST_SET_METHOD(useIntArg);
	TEST_SET_METHOD(letIntArg);
	TEST_SET_METHOD(weakIntArg);
	
	TEST_SET_METHOD(reqUintArg);
	TEST_SET_METHOD(useUintArg);
	TEST_SET_METHOD(letUintArg);
	TEST_SET_METHOD(weakUintArg);

	TEST_SET_METHOD(reqInt64Arg);
	TEST_SET_METHOD(useInt64Arg);
	TEST_SET_METHOD(letInt64Arg);
	TEST_SET_METHOD(weakInt64Arg);

	TEST_SET_METHOD(reqUint64Arg);
	TEST_SET_METHOD(useUint64Arg);
	TEST_SET_METHOD(letUint64Arg);
	TEST_SET_METHOD(weakUint64Arg);
	
	TEST_SET_METHOD(reqBoolArg);
	TEST_SET_METHOD(useBoolArg);
	TEST_SET_METHOD(letBoolArg);
	TEST_SET_METHOD(softBoolArg);
	TEST_SET_METHOD(weakBoolArg);
	
	TEST_SET_METHOD(reqOffsArg);
	TEST_SET_METHOD(useOffsArg);
	TEST_SET_METHOD(letOffsArg);
	TEST_SET_METHOD(weakOffsArg);
	
	TEST_SET_METHOD(reqDoubleArg);
	TEST_SET_METHOD(useDoubleArg);
	TEST_SET_METHOD(letDoubleArg);
	TEST_SET_METHOD(weakDoubleArg);
	
	TEST_SET_METHOD(reqFloatArg);
	TEST_SET_METHOD(useFloatArg);
	TEST_SET_METHOD(letFloatArg);
	TEST_SET_METHOD(weakFloatArg);
	
	TEST_SET_METHOD(reqExtArg);
	TEST_SET_METHOD(useExtArg);
	TEST_SET_METHOD(letExtArg);
	
	TEST_SET_METHOD(reqObjArg);
	TEST_SET_METHOD(useObjArg);
	TEST_SET_METHOD(letObjArg);
	
	TEST_SET_METHOD(reqArrayArg);
	TEST_SET_METHOD(useArrayArg);
	TEST_SET_METHOD(letArrayArg);
	
	TEST_SET_METHOD(letArrayStrArg);
	
	TEST_SET_METHOD(reqFunArg);
	TEST_SET_METHOD(reqArrvArg);
	TEST_SET_METHOD(reqBufArg);
	TEST_SET_METHOD(reqTypedArg);

	TEST_SET_METHOD(strcasestrProbe);
	TEST_SET_METHOD(getArrayDataUint32Meta);
	TEST_SET_METHOD(getDataPresence);
	TEST_SET_METHOD(getBufferDataFloatMeta);
	TEST_SET_METHOD(setBufferDataFloatFirst);
	
	TEST_SET_METHOD(consoleLogString);
	TEST_SET_METHOD(consoleLogArgs);
	TEST_SET_METHOD(globalLogString);
	TEST_SET_METHOD(globalLogArgs);

	CrashProbe::init(env, exports);
	
	return exports;
}

NODE_API_MODULE(test, init)
