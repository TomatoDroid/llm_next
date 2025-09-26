import classNames from "@/utils/classNames";

type SpinnerProps = {
  loading?: boolean;
  className?: string;
  children?: React.ReactNode
};

const Spinner = ({ loading = false, children, className }: SpinnerProps) => {
  return (
    <div className={classNames(
      'inline-block size-4 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-gray-200',
      loading ? "motion-reduce:animate-[spin_1.5s_linear_infinite]" : 'hidden',
      className
    )} role="status">
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading</span>
      {children}
    </div>
  )
}

export default Spinner;
