interface AppDatepickerCalendarProps {
    modelValue: string | null | undefined;
    /**
     * 3-character labels for weekday names ordered from Sunday to Saturday
     * Default: ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
     */
    weekdayNames?: string[];
    /**
     * Labels for the names of months ordered from January to December
     * Default: ['january', 'february', 'march', 'april', 'may', 'june', 'july',
     * 'august', 'september', 'october', 'november', 'december']
     */
    monthNames?: string[];
}
declare const _default: import("vue").DefineComponent<__VLS_WithDefaults<__VLS_TypePropsToOption<AppDatepickerCalendarProps>, {
    weekdayNames: () => string[];
    monthNames: () => string[];
}>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:model-value": (value: string) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToOption<AppDatepickerCalendarProps>, {
    weekdayNames: () => string[];
    monthNames: () => string[];
}>>> & {
    "onUpdate:model-value"?: ((value: string) => any) | undefined;
}, {
    weekdayNames: string[];
    monthNames: string[];
}, {}>;
export default _default;
type __VLS_WithDefaults<P, D> = {
    [K in keyof Pick<P, keyof P>]: K extends keyof D ? __VLS_Prettify<P[K] & {
        default: D[K];
    }> : P[K];
};
type __VLS_Prettify<T> = {
    [K in keyof T]: T[K];
} & {};
type __VLS_NonUndefinedable<T> = T extends undefined ? never : T;
type __VLS_TypePropsToOption<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? {
        type: import('vue').PropType<__VLS_NonUndefinedable<T[K]>>;
    } : {
        type: import('vue').PropType<T[K]>;
        required: true;
    };
};
