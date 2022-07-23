---
sidebar_position: 9
---

### Custom events

You can now replace event components with your own. To do this you will have to do two steps:

1. Create component for each view you want to change
2. Add this component to events passed to Kalend

### Step 1 - create component

    const Event = (props: any) => {
        return (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    zIndex: 9999,
                }}
            >
                <p style={{ fontSize: 11 }}>Normal: {props.summary}</p>
                <h4 style={{ fontSize: 10 }}>This event</h4>
                <button
                    onClick={(e: any) => {
                        e.stopPropagation();
                        e.preventDefault();
                        console.log('custom click');
                    }}
                    style={{
                        height: 30,
                        width: '100%',
                        zIndex: 999,
                        }}
                >
                    Button
                </button>
            </div>
        );
    };

### Step 2 - add components to event

    const event = {
      id: v4(),
      startAt: startDate.toUTC().toString(),
      endAt: endDate.toUTC().toString(),
      summary,
      children: {
        agendaView: <AgendaEvent summary={summary} />,
        daysView: <Event summary={summary} />,
        monthView: <MonthEvent summary={summary} />,
      }
    }
