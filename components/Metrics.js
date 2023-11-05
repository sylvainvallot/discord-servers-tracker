export default function Metrics({ data }) {
  const weekly = 7;
  const monthly = 30;
  const serverData = JSON.parse(data);
  let datasets = [];
  let rankingWeek = [];
  let rankingMonthly = [];

  for (const entry in serverData) {
    let data = [];

    for (const _ in serverData[entry]) {
      data.push({
        x: serverData[entry][_].date,
        y: serverData[entry][_].memberCount,
      });
    }

    datasets.push({
      data: data,
      label: entry,
    });
  }

  datasets.map((entry) => {
    rankingWeek.push({
      label: entry.label,
      metric: getMemberMetric(entry, weekly),
    });
    rankingMonthly.push({
      label: entry.label,
      metric: getMemberMetric(entry, monthly),
    })
  });

  function getMemberMetric(entry, timeSpan) {
    let dayCount;
    if(entry.data.length < timeSpan){
      dayCount = entry.data.length;
    } else {
      dayCount = timeSpan
    }
    const lastEntry = entry.data[entry.data.length - 1];
    const prevEntry = entry.data[entry.data.length - dayCount];
    const weekly = entry.data.slice(entry.data.length - dayCount, entry.data.length - 1)
    const start = weekly[0].y;
    let memberWeekMetric = 0
    weekly.map((e, i) => {
      if(i > 0){
        memberWeekMetric = memberWeekMetric + e.y - weekly[i-1].y;
      }
    })    
    return memberWeekMetric;
  }

  function getTimeSpan(entry, timeSpan) {
    let dayCount;
    if(entry.data.length < timeSpan){
      dayCount = entry.data.length;
    } else {
      dayCount = timeSpan
    }
    const lastEntry = entry.data[entry.data.length - 1];
    const prevEntry = entry.data[entry.data.length - dayCount];
    const options = { day: "numeric", month: "numeric", year: "numeric" };

    return `${new Date(prevEntry.x).toLocaleDateString(
      undefined,
      options
    )} au ${new Date(lastEntry.x).toLocaleDateString(undefined, options)}`;
  }

  function MemberMetric({ data, rank }) {
    function numberColor(number) {
      if (number > 0) return "text-green-500";
      if (number < 0) return "text-red-500";
      return "text-stone-600";
    }

    function Chevron({ className, number }) {
      if (number == 0)
        return (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.75 9h16.5m-16.5 6.75h16.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      if (number > 10)
        return (
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              d="M11.47 4.72a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06L12 6.31l-6.97 6.97a.75.75 0 01-1.06-1.06l7.5-7.5zm.53 7.59l-6.97 6.97a.75.75 0 01-1.06-1.06l7.5-7.5a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06L12 12.31z"
              fillRule="evenodd"
            />
          </svg>
        );
      if (number > 0)
        return (
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              d="M11.47 7.72a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 01-1.06-1.06l7.5-7.5z"
              fillRule="evenodd"
            />
          </svg>
        );
      if (number < 0)
        return (
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z"
              fillRule="evenodd"
            />
          </svg>
        );
      if (number < 10)
        return (
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              d="M20.03 4.72a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 11.69l6.97-6.97a.75.75 0 011.06 0zm0 6a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 111.06-1.06L12 17.69l6.97-6.97a.75.75 0 011.06 0z"
              fillRule="evenodd"
            />
          </svg>
        );
    }

    return (
      <div
        className={
          "p-3 flex flex-row items-center justify-between my-2 border-b"
        }
      >
        <div className="flex flex-row items-center gap-4">
          <div className="text-4xl font-bold text-gray-700">{rank}</div>
          <div className="text-lg">{data.label}</div>
        </div>
        <div className="flex flex-row items-center">
          <Chevron number={data.metric} />
          <div className={"font-bold text-2xl m-1 " + numberColor(data.metric)}>
            {data.metric}
          </div>
        </div>
      </div>
    );
  }
  rankingWeek.sort((a, b) => b.metric - a.metric);

  rankingWeek.forEach((element, index) => {
    element.rank = index + 1;
  });

  rankingMonthly.sort((a, b) => b.metric - a.metric);

  rankingMonthly.forEach((element, index) => {
    element.rank = index + 1;
  });

  return (
    <div className="container p-12 space-y-8">
    <div className="">
      <h3 className="font-bold text-3xl text-center">Performance Hebdomadaire</h3>
      <h4 className="italic text-center pb-6">
        Sur la période du {getTimeSpan(datasets[0], weekly)} - Exprimé en
        nouveaux membres
      </h4>
      <div className="md:grid grid-cols-2 gap-4">
        <div className="">
          {rankingWeek.slice(0, 6).map((entry) => {
            return (
              <MemberMetric data={entry} key={entry.rank} rank={entry.rank} />
            );
          })}
        </div>
        <div className="">
          {rankingWeek.slice(6).map((entry) => {
            return (
              <MemberMetric data={entry} key={entry.rank} rank={entry.rank} />
            );
          })}
        </div>
      </div>
    </div>
    <div className="">
      <h3 className="font-bold text-3xl text-center">Performance Mensuelle</h3>
      <h4 className="italic text-center pb-6">
        Sur la période du {getTimeSpan(datasets[0], monthly)} - Exprimé en
        nouveaux membres
      </h4>
      <div className="md:grid grid-cols-2 gap-4">
        <div className="">
          {rankingMonthly.slice(0, 6).map((entry) => {
            return (
              <MemberMetric data={entry} key={entry.rank} rank={entry.rank} />
            );
          })}
        </div>
        <div className="">
          {rankingMonthly.slice(6).map((entry) => {
            return (
              <MemberMetric data={entry} key={entry.rank} rank={entry.rank} />
            );
          })}
        </div>
      </div>
    </div>
    </div>
  );
}
