{profile.isSmoker && (
              <p className="text-sm text-blue-100 mt-4">
                ⚠️ Smoking can affect your metabolism and recovery. Consider quitting for better results!
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // SETTINGS VIEW
  if (view === 'settings') {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-6">
        <div className="max-w-2xl mx-auto">
          <button onClick={() => setView('home')} className="mb-6 text-blue-400 hover:text-blue-300 flex items-center gap-2">
            <ChevronLeft size={20} />
            Back to Home
          </button>
          
          <h1 className="text-4xl font-bold mb-8 flex items-center gap-3">
            <Settings size={36} />
            Settings
          </h1>

          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4">Steps Goal Configuration</h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 mb-2">Start Steps Goal</label>
                  <input type="number" value={settings.startSteps} onChange={(e) => setSettings({...settings, startSteps: parseInt(e.target.value)})} onBlur={() => saveSettings(settings)} className="w-full bg-gray-700 px-4 py-3 rounded-lg" />
                </div>
                <div>
                  <label className="block text-gray-400 mb-2">End Steps Goal</label>
                  <input type="number" value={settings.endSteps} onChange={(e) => setSettings({...settings, endSteps: parseInt(e.target.value)})} onBlur={() => saveSettings(settings)} className="w-full bg-gray-700 px-4 py-3 rounded-lg" />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-400 mb-2">Total Days to Achieve Goal</label>
                <input type="number" value={settings.totalDays} onChange={(e) => setSettings({...settings, totalDays: parseInt(e.target.value)})} onBlur={() => saveSettings(settings)} className="w-full bg-gray-700 px-4 py-3 rounded-lg" />
              </div>
              
              <div>
                <label className="block text-gray-400 mb-2">Start Date</label>
                <input type="date" value={settings.startDate} onChange={(e) => { const newSettings = {...settings, startDate: e.target.value}; setSettings(newSettings); saveSettings(newSettings); }} className="w-full bg-gray-700 px-4 py-3 rounded-lg" />
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-900 rounded-lg">
              <p className="text-sm text-blue-200">
                📊 Your plan: Start at {settings.startSteps.toLocaleString()} steps and reach {settings.endSteps.toLocaleString()} steps in {settings.totalDays} days
                <br />
                Daily increase: ~{Math.round((settings.endSteps - settings.startSteps) / settings.totalDays)} steps/day
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // DASHBOARD VIEW
  if (view === 'dashboard') {
    const totalActiveCalories = workoutHistory.reduce((sum, w) => sum + (w.activeCalories || 0), 0);
    const totalDailyCalories = dailyLogs.reduce((sum, d) => sum + (d.totalCalories || 0), 0);
    const totalSteps = dailyLogs.reduce((sum, d) => sum + (d.totalSteps || 0), 0);
    
    const bmr = calculateBMR(profile.weight, profile.height, profile.age, profile.gender);
    const tdee = bmr * 1.55;
    const avgDailyCaloriesBurned = dailyLogs.length > 0 ? totalDailyCalories / dailyLogs.length : 0;
    const avgDailyDeficit = avgDailyCaloriesBurned > tdee ? avgDailyCaloriesBurned - tdee : 0;
    const projectedWeightLoss = calculateWeightLoss(avgDailyDeficit, settings.totalDays);
    const currentWeightLoss = calculateWeightLoss(avgDailyDeficit, workoutHistory.length || 1);
    
    return (
      <div className="min-h-screen bg-gray-900 text-white p-6">
        <div className="max-w-6xl mx-auto">
          <button onClick={() => setView('home')} className="mb-6 text-blue-400 hover:text-blue-300 flex items-center gap-2">
            <ChevronLeft size={20} />
            Back to Home
          </button>
          
          <h1 className="text-4xl font-bold mb-8 flex items-center gap-3">
            <TrendingUp size={36} />
            Your Progress Dashboard
          </h1>

          <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-2">🎯 You're Making Amazing Progress!</h2>
            <p className="text-lg">
              Keep going! Based on your current pace, you're on track to lose approximately <strong>{currentWeightLoss.toFixed(1)} kg</strong> already!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-br from-orange-600 to-red-600 rounded-lg p-6">
              <div className="text-sm mb-2">Active Calories</div>
              <div className="text-4xl font-bold">{totalActiveCalories.toLocaleString()}</div>
              <div className="text-sm mt-1 text-orange-100">From workouts</div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg p-6">
              <div className="text-sm mb-2">Total Steps</div>
              <div className="text-4xl font-bold">{totalSteps.toLocaleString()}</div>
              <div className="text-sm mt-1 text-blue-100">Logged so far</div>
            </div>
            
            <div className="bg-gradient-to-br from-green-600 to-teal-600 rounded-lg p-6">
              <div className="text-sm mb-2">Current Day</div>
              <div className="text-4xl font-bold">{currentDayData.dayNumber}/{settings.totalDays}</div>
              <div className="text-sm mt-1 text-green-100">{Math.round((currentDayData.dayNumber / settings.totalDays) * 100)}% complete</div>
            </div>
            
            <div className="bg-gradient-to-br from-pink-600 to-purple-600 rounded-lg p-6">
              <div className="text-sm mb-2 flex items-center gap-2">
                <TrendingDown size={16} />
                Est. Weight Loss
              </div>
              <div className="text-4xl font-bold">{currentWeightLoss.toFixed(1)} kg</div>
              <div className="text-sm mt-1 text-pink-100">So far!</div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <TrendingDown size={24} className="text-green-400" />
              Weight Loss Insights
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="text-gray-400 text-sm mb-1">Your TDEE</div>
                <div className="text-2xl font-bold">{Math.round(tdee)} cal</div>
                <div className="text-xs text-gray-400 mt-1">Daily energy expenditure</div>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="text-gray-400 text-sm mb-1">Avg Daily Deficit</div>
                <div className="text-2xl font-bold text-green-400">
                  {avgDailyDeficit > 0 ? Math.round(avgDailyDeficit) : 0} cal
                </div>
                <div className="text-xs text-gray-400 mt-1">Calories above TDEE</div>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="text-gray-400 text-sm mb-1">Projected Total Loss</div>
                <div className="text-2xl font-bold text-purple-400">{projectedWeightLoss.toFixed(1)} kg</div>
                <div className="text-xs text-gray-400 mt-1">By day {settings.totalDays}</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-lg p-4">
              <h3 className="font-bold mb-2">💡 How we calculate this:</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Your TDEE is based on your BMR and activity level</li>
                <li>• We track your daily calorie burn from all activities</li>
                <li>• A deficit of 7,700 calories = ~1 kg of fat loss</li>
                <li>• Current pace: ~{(currentWeightLoss / (workoutHistory.length || 1) * 7).toFixed(2)} kg per week</li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Footprints size={24} />
              Steps Target Progression
            </h2>
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>Day 1: {settings.startSteps.toLocaleString()} steps</span>
                <span>Current: {calculateStepsTarget(currentDayData.dayNumber, settings.startSteps, settings.endSteps, settings.totalDays).toLocaleString()} steps</span>
                <span>Day {settings.totalDays}: {settings.endSteps.toLocaleString()} steps</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-6">
                <div 
                  className="bg-gradient-to-r from-green-500 to-blue-500 h-6 rounded-full flex items-center justify-end pr-3"
                  style={{ width: `${(currentDayData.dayNumber / settings.totalDays) * 100}%` }}
                >
                  <span className="text-xs font-bold">{Math.round((currentDayData.dayNumber / settings.totalDays) * 100)}%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">Treadmill Sessions</h2>
            {workoutHistory.length > 0 ? (
              <div className="space-y-3">
                {workoutHistory.map((workout, index) => (
                  <div key={index} className="bg-gray-700 rounded-lg p-4 flex justify-between items-center">
                    <div>
                      <div className="font-semibold">{workout.day}</div>
                      <div className="text-sm text-gray-400">
                        Day {workout.dayNumber} • {new Date(workout.date).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {editingWorkout === index ? (
                        <>
                          <input
                            type="number"
                            value={workout.activeCalories}
                            onChange={(e) => editWorkoutData(index, 'activeCalories', e.target.value)}
                            className="bg-gray-600 px-3 py-1 rounded w-24 text-center"
                          />
                          <button
                            onClick={() => setEditingWorkout(null)}
                            className="text-green-400 hover:text-green-300"
                          >
                            <Check size={20} />
                          </button>
                        </>
                      ) : (
                        <>
                          <div className="text-right">
                            <div className="flex items-center gap-2 text-orange-400 font-bold">
                              <Flame size={20} />
                              {workout.activeCalories} cal
                            </div>
                            <div className="flex items-center gap-2 text-green-400 text-sm">
                              <Footprints size={16} />
                              Target: {workout.stepsTarget.toLocaleString()}
                            </div>
                          </div>
                          <button
                            onClick={() => setEditingWorkout(index)}
                            className="text-blue-400 hover:text-blue-300"
                          >
                            <Edit2 size={18} />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-center py-8">No workouts completed yet. Start your first workout today!</p>
            )}
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Daily Activity Logs</h2>
            {dailyLogs.length > 0 ? (
              <div className="space-y-3">
                {dailyLogs.map((log, index) => (
                  <div key={index} className="bg-gray-700 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-semibold">
                        {new Date(log.date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                      </div>
                      <div className="text-sm text-gray-400">Day {log.dayNumber}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-600 rounded p-3">
                        <div className="text-xs text-gray-400 mb-1">Total Steps</div>
                        <input
                          type="number"
                          value={log.totalSteps}
                          onChange={(e) => editDailyLogHandler(index, 'totalSteps', e.target.value)}
                          className="bg-transparent text-xl font-bold w-full"
                        />
                      </div>
                      <div className="bg-gray-600 rounded p-3">
                        <div className="text-xs text-gray-400 mb-1">Total Calories</div>
                        <input
                          type="number"
                          value={log.totalCalories}
                          onChange={(e) => editDailyLogHandler(index, 'totalCalories', e.target.value)}
                          className="bg-transparent text-xl font-bold w-full"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-center py-8">No daily logs yet. Start logging your activities from the home page!</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // SETUP VIEW
  if (view === 'setup') {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-6">
        <div className="max-w-4xl mx-auto">
          <button onClick={() => setView('home')} className="mb-6 text-blue-400 hover:text-blue-300 flex items-center gap-2">
            <ChevronLeft size={20} />
            Back to Home
          </button>
          
          <h1 className="text-3xl font-bold mb-6">Setup {currentDay}'s Workout</h1>
          
          <div className="bg-gray-800 rounded-lg p-6 mb-6">
            <div className="grid grid-cols-3 gap-4 mb-4 font-bold text-gray-400">
              <div>Minute</div>
              <div>Speed (kmph)</div>
              <div>Incline (%)</div>
            </div>
            
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {weeklyWorkouts[currentDay].map((interval, index) => (
                <div key={index} className="grid grid-cols-3 gap-4 items-center">
                  <div className="text-lg">{interval.minute}</div>
                  <input
                    type="number"
                    step="0.1"
                    value={interval.speed}
                    onChange={(e) => updateWorkout(currentDay, index, 'speed', e.target.value)}
                    className="bg-gray-700 px-3 py-2 rounded"
                  />
                  <input
                    type="number"
                    step="0.5"
                    value={interval.incline}
                    onChange={(e) => updateWorkout(currentDay, index, 'incline', e.target.value)}
                    className="bg-gray-700 px-3 py-2 rounded"
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setView('home')}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-lg text-xl"
          >
            Save Workout
          </button>
        </div>
      </div>
    );
  }

  // WORKOUT VIEW
  if (view === 'workout') {
    const current = weeklyWorkouts[currentDay][currentMinute];
    const next = currentMinute < 34 ? weeklyWorkouts[currentDay][currentMinute + 1] : null;
    const progress = ((currentMinute * 60 + (60 - secondsLeft)) / (35 * 60)) * 100;

    return (
      <div className={`min-h-screen ${showWarning ? 'bg-orange-600' : 'bg-gray-900'} text-white transition-colors duration-300`}>
        <audio ref={audioRef} src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjiP1fPPeTEFJHfH8N2RQAoUXrTp66hVFApGn+DyvmwhBjiP1fPPeTEFJHfH8N2RQAoUXrTp66hVFApGn+DyvmwhBjiP1fPPeTEFJHfH8N2RQAoUXrTp66hVFApGn+DyvmwhBjiP1fPPeTEFJHfH8N2RQAoUXrTp66hVFApGn+DyvmwhBjiP1fPPeTEFJHfH8N2RQAoUXrTp66hVFApGn+DyvmwhBjiP1fPPeTEFJHfH8N2RQAoUXrTp66hVFApGn+DyvmwhBjiP1fPPeTEFJHfH8N2RQAoUXrTp66hVFApGn+DyvmwhBjiP1fPPeTEFJHfH8N2RQAoUXrTp66hVFApGn+DyvmwhBjiP1fPPeTEFJHfH8N2RQAoUXrTp66hVFApGn+DyvmwhBjiP1fPPeTEFJHfH8N2RQAoUXrTp66hVFApGn+DyvmwhBjiP1fPPeTEFJHfH8N2RQAoUXrTp66hVFApGn+DyvmwhBjiP1fPPeTEFJHfH8N2RQAoUXrTp66hVFApGn+DyvmwhBjiP1fPPeTEFJHfH8N2RQAoUXrTp66hVFApGn+DyvmwhBjiP1fPPeTEFJHfH8N2RQAoUXrTp66hVFApGn+DyvmwhBjiP1fPPeTEFJHfH8N2RQAoUXrTp66hVFApGn+DyvmwhBjiP1fPPeTEFJHfH8N2RQAoUXrTp66hVFApGn+DyvmwhBjiP1fPPeTEFJHfH8N2RQAoUXrTp66hVFApGn+DyvmwhBjiP1fPPeTEFJHfH8N2RQAoUXrTp66hVFApGn+DyvmwhBjiP1fPPeTEFJHfH8N2RQAoUXrTp66hVFApGn+DyvmwhBjiP1fPPeTEFJHfH8N2RQAoUXrTp66hVFApGn+DyvmwhBjiP1fPPeTEFJHfH8N2RQAoUXrTp66hVFApGn+DyvmwhBjiP1fPPeTEFJHfH8N2RQAoUXrTp66hVFApGn+DyvmwhBjiP1fPPeTEFJHfH8N2RQAoUXrTp66hVFApGn+DyvmwhBjiP1fPPeTEFJHfH8N2RQAoUXrTp66hVFApGn+DyvmwhBjiP1fPPeTEFJHfH8N2RQAoUXrTp66hVFApGn+DyvmwhBjiP1fPPeTEFJHfH8N2RQAoUXrTp66hVFApGn+DyvmwhBjiP1fPPeTEFJHfH8N2RQAoUXrTp66hVFApGn+DyvmwhBjiP1fPPeTEFJHfH8N2RQAoUXrTp66hVFApGn+DyvmwhBjiP1fPPeTEFJHfH8N2RQAoUXrTp66hVFApGn+DyvmwhBjiP1fPPeTEFJHfH8N2RQAoUXrTp66hVFApGn+DyvmwhBjiP1fPPeTEFJHfH8N2RQAoUXrTp66hVFApGn+DyvmwhBjiP1fPPeTEFJHfH8N2RQAoUXrTp66hVFApGn+DyvmwhBjiP1fPPeTEFJHfH8N2RQAoUXrTp66hVFA==" />
        
        <div className="container mx-auto px-4 py-8 max-w-2xl">
          {showWarning && (
            <div className="text-center mb-8 animate-pulse">
              <div className="text-6xl font-bold mb-2">⚠️ GET READY!</div>
              <div className="text-3xl font-bold">Change in {secondsLeft} seconds</div>
            </div>
          )}

          <div className="bg-gray-800 rounded-lg p-8 mb-6">
            <div className="text-center mb-8">
              <div className="text-gray-400 text-lg mb-2">CURRENT INTERVAL</div>
              <div className="text-6xl font-bold mb-4">Minute {current.minute}</div>
              <div className="grid grid-cols-2 gap-8 mb-6">
                <div>
                  <div className="text-gray-400 text-sm mb-1">Speed</div>
                  <div className="text-5xl font-bold text-blue-400">{current.speed}</div>
                  <div className="text-gray-400">kmph</div>
                </div>
                <div>
                  <div className="text-gray-400 text-sm mb-1">Incline</div>
                  <div className="text-5xl font-bold text-green-400">{current.incline}</div>
                  <div className="text-gray-400">%</div>
                </div>
              </div>
              <div className="text-5xl font-bold text-yellow-400">{formatTime(secondsLeft)}</div>
            </div>

            {next && (
              <div className="border-t border-gray-700 pt-6">
                <div className="text-gray-400 text-lg mb-2">NEXT UP</div>
                <div className="text-3xl font-bold mb-2">Minute {next.minute}</div>
                <div className="flex justify-center gap-8">
                  <div>
                    <span className="text-blue-400 text-2xl font-bold">{next.speed}</span>
                    <span className="text-gray-400 ml-2">kmph</span>
                  </div>
                  <div>
                    <span className="text-green-400 text-2xl font-bold">{next.incline}</span>
                    <span className="text-gray-400 ml-2">%</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="bg-gray-800 rounded-lg p-4 mb-6">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-4">
              <div 
                className="bg-green-500 h-4 rounded-full transition-all duration-1000"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg text-xl flex items-center justify-center gap-2"
            >
              {isRunning ? <Pause size={24} /> : <Play size={24} />}
              {isRunning ? 'Pause' : 'Resume'}
            </button>
            <button
              onClick={() => {
                setIsRunning(false);
                setView('home');
              }}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-lg text-xl flex items-center justify-center gap-2"
            >
              <RotateCcw size={24} />
              End
            </button>
          </div>
        </div>
      </div>
    );
  }

  // COMPLETE VIEW
  if (view === 'complete') {
    const [activeCaloriesInput, setActiveCaloriesInput] = useState('');
    const stepsTarget = calculateStepsTarget(
      currentDayData.dayNumber,
      settings.startSteps,
      settings.endSteps,
      settings.totalDays
    );
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-900 via-blue-900 to-gray-900 text-white p-6">
        <div className="max-w-2xl mx-auto text-center py-12">
          <div className="text-6xl mb-6">🎉</div>
          <h1 className="text-4xl font-bold mb-4">Workout Complete!</h1>
          <p className="text-xl text-gray-300 mb-8">Great job finishing your 35-minute session</p>
          
          <div className="bg-gray-800 rounded-lg p-8 mb-6">
            <div className="mb-6">
              <div className="text-gray-400 mb-2">Today's Steps Target</div>
              <div className="text-5xl font-bold text-green-400 flex items-center justify-center gap-3">
                <Footprints size={48} />
                {stepsTarget.toLocaleString()}
              </div>
            </div>
            
            <div className="border-t border-gray-700 pt-6">
              <label className="block text-gray-400 mb-3 text-lg">
                Enter Active Calories Burned (from Apple Watch)
              </label>
              <input
                type="number"
                value={activeCaloriesInput}
                onChange={(e) => setActiveCaloriesInput(e.target.value)}
                placeholder="e.g. 350"
                className="w-full bg-gray-700 text-white px-6 py-4 rounded-lg text-2xl text-center mb-4"
              />
              <p className="text-sm text-gray-400">This is for the treadmill session only</p>
            </div>
          </div>

          <button
            onClick={() => {
              saveWorkoutCompletion(activeCaloriesInput);
              setView('home');
            }}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-lg text-xl mb-4"
          >
            Save & Continue
          </button>
          
          <button
            onClick={() => setView('home')}
            className="text-gray-400 hover:text-white"
          >
            Skip for now
          </button>
        </div>
      </div>
    );
  }

  return null;
}
          import React, { useState, useEffect, useRef } from 'react';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, getDoc, collection, query, orderBy, getDocs, updateDoc } from 'firebase/firestore';
import { auth, googleProvider, db } from './firebase';
import { Play, Pause, RotateCcw, Edit2, Calendar, TrendingUp, Target, Flame, Footprints, ChevronLeft, Plus, X, Check, AlertCircle, TrendingDown, User, Settings, Award, LogOut } from 'lucide-react';

const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const calculateStepsTarget = (dayNumber, startSteps, endSteps, totalDays) => {
  const stepsIncrease = (endSteps - startSteps) / (totalDays - 1);
  return Math.round(startSteps + (dayNumber - 1) * stepsIncrease);
};

const calculateBMR = (weight, height, age, gender) => {
  if (gender === 'male') {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  }
  return 10 * weight + 6.25 * height - 5 * age - 161;
};

const calculateWeightLoss = (calorieDeficit, days) => {
  return (calorieDeficit * days) / 7700;
};

export default function FitnessApp() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('home');
  const [currentDay, setCurrentDay] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [currentMinute, setCurrentMinute] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [showWarning, setShowWarning] = useState(false);
  const [showDailyDataModal, setShowDailyDataModal] = useState(false);
  const [editingWorkout, setEditingWorkout] = useState(null);
  const audioRef = useRef(null);

  const [profile, setProfile] = useState({
    name: '',
    age: 25,
    weight: 70,
    height: 170,
    gender: 'male',
    isSmoker: false
  });

  const [settings, setSettings] = useState({
    startSteps: 5000,
    endSteps: 10000,
    totalDays: 84,
    startDate: new Date().toISOString().split('T')[0]
  });

  const [dailyData, setDailyData] = useState({
    totalSteps: '',
    totalCalories: '',
    date: new Date().toISOString().split('T')[0]
  });

  const [weeklyWorkouts, setWeeklyWorkouts] = useState(
    DAYS_OF_WEEK.reduce((acc, day) => {
      acc[day] = Array.from({ length: 35 }, (_, i) => ({
        minute: i + 1,
        speed: 4.5,
        incline: 0
      }));
      return acc;
    }, {})
  );

  const [workoutHistory, setWorkoutHistory] = useState([]);
  const [dailyLogs, setDailyLogs] = useState([]);
  const [currentDayData, setCurrentDayData] = useState({ dayNumber: 1 });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (currentUser) {
        loadUserData(currentUser.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  const loadUserData = async (userId) => {
    try {
      const profileDoc = await getDoc(doc(db, 'users', userId, 'data', 'profile'));
      if (profileDoc.exists()) setProfile(profileDoc.data());

      const settingsDoc = await getDoc(doc(db, 'users', userId, 'data', 'settings'));
      if (settingsDoc.exists()) setSettings(settingsDoc.data());

      const currentDayDoc = await getDoc(doc(db, 'users', userId, 'data', 'currentDay'));
      if (currentDayDoc.exists()) setCurrentDayData(currentDayDoc.data());

      const workoutsDoc = await getDoc(doc(db, 'users', userId, 'data', 'weeklyWorkouts'));
      if (workoutsDoc.exists()) setWeeklyWorkouts(workoutsDoc.data());

      const historyQuery = query(collection(db, 'users', userId, 'workoutHistory'), orderBy('date', 'desc'));
      const historySnapshot = await getDocs(historyQuery);
      setWorkoutHistory(historySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

      const logsQuery = query(collection(db, 'users', userId, 'dailyLogs'), orderBy('date', 'desc'));
      const logsSnapshot = await getDocs(logsQuery);
      setDailyLogs(logsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const saveProfile = async (newProfile) => {
    if (!user) return;
    try {
      await setDoc(doc(db, 'users', user.uid, 'data', 'profile'), newProfile);
      setProfile(newProfile);
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  const saveSettings = async (newSettings) => {
    if (!user) return;
    try {
      await setDoc(doc(db, 'users', user.uid, 'data', 'settings'), newSettings);
      setSettings(newSettings);
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  const saveCurrentDay = async (newDayData) => {
    if (!user) return;
    try {
      await setDoc(doc(db, 'users', user.uid, 'data', 'currentDay'), newDayData);
      setCurrentDayData(newDayData);
    } catch (error) {
      console.error('Error saving current day:', error);
    }
  };

  const saveWeeklyWorkouts = async (newWorkouts) => {
    if (!user) return;
    try {
      await setDoc(doc(db, 'users', user.uid, 'data', 'weeklyWorkouts'), newWorkouts);
      setWeeklyWorkouts(newWorkouts);
    } catch (error) {
      console.error('Error saving workouts:', error);
    }
  };

  const saveWorkoutHistory = async (workout) => {
    if (!user) return;
    try {
      const docRef = doc(collection(db, 'users', user.uid, 'workoutHistory'));
      await setDoc(docRef, workout);
      setWorkoutHistory([{ id: docRef.id, ...workout }, ...workoutHistory]);
    } catch (error) {
      console.error('Error saving workout:', error);
    }
  };

  const saveDailyLog = async (log) => {
    if (!user) return;
    try {
      const existingLog = dailyLogs.find(l => l.date === log.date);
      
      if (existingLog) {
        await updateDoc(doc(db, 'users', user.uid, 'dailyLogs', existingLog.id), log);
        setDailyLogs(dailyLogs.map(l => l.id === existingLog.id ? { ...l, ...log } : l));
      } else {
        const docRef = doc(collection(db, 'users', user.uid, 'dailyLogs'));
        await setDoc(docRef, log);
        setDailyLogs([{ id: docRef.id, ...log }, ...dailyLogs].sort((a, b) => 
          new Date(b.date) - new Date(a.date)
        ));
      }
    } catch (error) {
      console.error('Error saving daily log:', error);
    }
  };

  useEffect(() => {
    let interval;
    if (isRunning && view === 'workout') {
      interval = setInterval(() => {
        setSecondsLeft(prev => {
          if (prev <= 1) {
            if (currentMinute < 34) {
              setCurrentMinute(curr => curr + 1);
              setShowWarning(false);
              return 60;
            } else {
              setIsRunning(false);
              setView('complete');
              return 0;
            }
          }
          
          if (prev === 6) {
            setShowWarning(true);
            if (audioRef.current) {
              audioRef.current.play();
            }
          }
          
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, currentMinute, view]);

  const handleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Error signing in:', error);
      alert('Error signing in. Please try again.');
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setView('home');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const getTodayDay = () => {
    const today = new Date().getDay();
    return DAYS_OF_WEEK[today === 0 ? 6 : today - 1];
  };

  const startTodayWorkout = () => {
    const today = getTodayDay();
    setCurrentDay(today);
    setView('workout');
    setIsRunning(true);
    setCurrentMinute(0);
    setSecondsLeft(60);
    setShowWarning(false);
  };

  const handleMissedSession = () => {
    alert('No worries! Your target stays the same today. Tomorrow will continue from where you should be.');
  };

  const saveDailyDataHandler = () => {
    const log = {
      date: dailyData.date,
      totalSteps: parseInt(dailyData.totalSteps) || 0,
      totalCalories: parseInt(dailyData.totalCalories) || 0,
      dayNumber: currentDayData.dayNumber
    };
    
    saveDailyLog(log);
    setShowDailyDataModal(false);
    setDailyData({
      totalSteps: '',
      totalCalories: '',
      date: new Date().toISOString().split('T')[0]
    });
  };

  const handleSetupDay = (day) => {
    setCurrentDay(day);
    setView('setup');
  };

  const updateWorkout = (day, index, field, value) => {
    const newWorkouts = { ...weeklyWorkouts };
    newWorkouts[day][index][field] = parseFloat(value);
    saveWeeklyWorkouts(newWorkouts);
  };

  const saveWorkoutCompletion = (activeCalories) => {
    const stepsTarget = calculateStepsTarget(
      currentDayData.dayNumber,
      settings.startSteps,
      settings.endSteps,
      settings.totalDays
    );
    
    const workout = {
      date: new Date().toISOString(),
      day: currentDay,
      dayNumber: currentDayData.dayNumber,
      activeCalories: parseInt(activeCalories) || 0,
      stepsTarget: stepsTarget,
      duration: 35
    };
    
    saveWorkoutHistory(workout);
    saveCurrentDay({ dayNumber: currentDayData.dayNumber + 1 });
  };

  const editWorkoutData = (index, field, value) => {
    const updated = [...workoutHistory];
    updated[index][field] = parseInt(value) || 0;
    setWorkoutHistory(updated);
    if (user && updated[index].id) {
      updateDoc(doc(db, 'users', user.uid, 'workoutHistory', updated[index].id), { [field]: parseInt(value) || 0 });
    }
    setEditingWorkout(null);
  };

  const editDailyLogHandler = async (index, field, value) => {
    const updated = [...dailyLogs];
    updated[index][field] = parseInt(value) || 0;
    setDailyLogs(updated);
    if (user && updated[index].id) {
      await updateDoc(doc(db, 'users', user.uid, 'dailyLogs', updated[index].id), { [field]: parseInt(value) || 0 });
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white flex items-center justify-center">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <h1 className="text-5xl font-bold mb-4">💪 Fitness Tracker</h1>
          <p className="text-xl text-gray-300 mb-8">
            Your personal weight loss companion. Track workouts, monitor progress, and achieve your fitness goals!
          </p>
          <button
            onClick={handleSignIn}
            className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-4 px-8 rounded-lg text-xl flex items-center justify-center gap-3 mx-auto"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  // HOME VIEW
  if (view === 'home') {
    const today = getTodayDay();
    const stepsTarget = calculateStepsTarget(currentDayData.dayNumber, settings.startSteps, settings.endSteps, settings.totalDays);
    const totalCalories = workoutHistory.reduce((sum, w) => sum + (w.activeCalories || 0), 0) + dailyLogs.reduce((sum, d) => sum + (d.totalCalories || 0), 0);
    const totalWorkouts = workoutHistory.length;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                {profile.name ? `Hey ${profile.name}! 👋` : `Hey ${user.displayName}! 👋`}
              </h1>
              <p className="text-gray-400">Day {currentDayData.dayNumber} of {settings.totalDays} • Target: {stepsTarget.toLocaleString()} steps</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setView('profile')} className="bg-gray-800 hover:bg-gray-700 p-3 rounded-lg">
                <User size={24} />
              </button>
              <button onClick={() => setView('settings')} className="bg-gray-800 hover:bg-gray-700 p-3 rounded-lg">
                <Settings size={24} />
              </button>
              <button onClick={handleSignOut} className="bg-red-600 hover:bg-red-700 p-3 rounded-lg">
                <LogOut size={24} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-2">
                <Flame className="text-orange-400" size={24} />
                <div className="text-gray-400">Total Calories</div>
              </div>
              <div className="text-3xl font-bold">{totalCalories.toLocaleString()}</div>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-2">
                <Target className="text-green-400" size={24} />
                <div className="text-gray-400">Today's Target</div>
              </div>
              <div className="text-3xl font-bold">{stepsTarget.toLocaleString()}</div>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-2">
                <Award className="text-yellow-400" size={24} />
                <div className="text-gray-400">Workouts Done</div>
              </div>
              <div className="text-3xl font-bold">{totalWorkouts}</div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-6 mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold mb-1">Log Your Daily Activity</h3>
                <p className="text-sm text-purple-100">Track your full day steps and calories for any date</p>
              </div>
              <button
                onClick={() => {
                  setDailyData({ totalSteps: '', totalCalories: '', date: new Date().toISOString().split('T')[0] });
                  setShowDailyDataModal(true);
                }}
                className="bg-white text-purple-600 hover:bg-gray-100 font-bold py-3 px-6 rounded-lg flex items-center gap-2"
              >
                <Plus size={20} />
                Log Day
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-center">
              <div className="text-xl font-bold mb-2">Ready for today?</div>
              <div className="text-lg mb-4 text-blue-100">{today}'s Workout</div>
              <button
                onClick={startTodayWorkout}
                className="w-full bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-6 rounded-lg text-lg flex items-center justify-center gap-2"
              >
                <Play size={20} />
                Start Workout
              </button>
            </div>
            
            <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-lg p-6 text-center">
              <div className="text-xl font-bold mb-2">Missed yesterday?</div>
              <div className="text-lg mb-4 text-orange-100">Keep target same today</div>
              <button
                onClick={handleMissedSession}
                className="w-full bg-white text-orange-600 hover:bg-gray-100 font-bold py-3 px-6 rounded-lg text-lg flex items-center justify-center gap-2"
              >
                <AlertCircle size={20} />
                Missed Session
              </button>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Calendar size={24} />
              Weekly Schedule
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {DAYS_OF_WEEK.map(day => (
                <div key={day} className={`p-4 rounded-lg flex justify-between items-center ${day === today ? 'bg-blue-600' : 'bg-gray-700'}`}>
                  <span className="font-semibold">{day}</span>
                  <button onClick={() => handleSetupDay(day)} className="bg-gray-600 hover:bg-gray-500 px-4 py-2 rounded flex items-center gap-2">
                    <Edit2 size={16} />
                    Edit
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button onClick={() => setView('dashboard')} className="bg-gray-800 hover:bg-gray-700 rounded-lg p-6 flex items-center justify-center gap-3">
              <TrendingUp size={24} />
              <span className="font-bold">View Dashboard</span>
            </button>
            <button onClick={() => setView('profile')} className="bg-gray-800 hover:bg-gray-700 rounded-lg p-6 flex items-center justify-center gap-3">
              <User size={24} />
              <span className="font-bold">My Profile</span>
            </button>
          </div>
        </div>

        {showDailyDataModal && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Log Daily Activity</h2>
                <button onClick={() => setShowDailyDataModal(false)}><X size={24} /></button>
              </div>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-gray-400 mb-2">Date</label>
                  <input type="date" value={dailyData.date} onChange={(e) => setDailyData({...dailyData, date: e.target.value})} className="w-full bg-gray-700 px-4 py-3 rounded-lg text-lg" />
                </div>
                <div>
                  <label className="block text-gray-400 mb-2">Total Steps</label>
                  <input type="number" value={dailyData.totalSteps} onChange={(e) => setDailyData({...dailyData, totalSteps: e.target.value})} placeholder="e.g. 8500" className="w-full bg-gray-700 px-4 py-3 rounded-lg text-lg" />
                </div>
                <div>
                  <label className="block text-gray-400 mb-2">Total Calories Burned</label>
                  <input type="number" value={dailyData.totalCalories} onChange={(e) => setDailyData({...dailyData, totalCalories: e.target.value})} placeholder="e.g. 2500" className="w-full bg-gray-700 px-4 py-3 rounded-lg text-lg" />
                </div>
              </div>
              
              <button onClick={saveDailyDataHandler} className="w-full bg-green-600 hover:bg-green-700 font-bold py-3 rounded-lg flex items-center justify-center gap-2">
                <Check size={20} />
                Save Data
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // PROFILE VIEW
  if (view === 'profile') {
    const bmr = calculateBMR(profile.weight, profile.height, profile.age, profile.gender);
    const tdee = bmr * 1.55;
    
    return (
      <div className="min-h-screen bg-gray-900 text-white p-6">
        <div className="max-w-2xl mx-auto">
          <button onClick={() => setView('home')} className="mb-6 text-blue-400 hover:text-blue-300 flex items-center gap-2">
            <ChevronLeft size={20} />
            Back to Home
          </button>
          
          <h1 className="text-4xl font-bold mb-8 flex items-center gap-3">
            <User size={36} />
            Your Profile
          </h1>

          <div className="bg-gray-800 rounded-lg p-6 mb-6">
            <div className="space-y-4">
              <div>
                <label className="block text-gray-400 mb-2">Name</label>
                <input type="text" value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} onBlur={() => saveProfile(profile)} placeholder="Enter your name" className="w-full bg-gray-700 px-4 py-3 rounded-lg" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 mb-2">Age</label>
                  <input type="number" value={profile.age} onChange={(e) => setProfile({...profile, age: parseInt(e.target.value)})} onBlur={() => saveProfile(profile)} className="w-full bg-gray-700 px-4 py-3 rounded-lg" />
                </div>
                <div>
                  <label className="block text-gray-400 mb-2">Gender</label>
                  <select value={profile.gender} onChange={(e) => { const newProfile = {...profile, gender: e.target.value}; setProfile(newProfile); saveProfile(newProfile); }} className="w-full bg-gray-700 px-4 py-3 rounded-lg">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 mb-2">Weight (kg)</label>
                  <input type="number" step="0.1" value={profile.weight} onChange={(e) => setProfile({...profile, weight: parseFloat(e.target.value)})} onBlur={() => saveProfile(profile)} className="w-full bg-gray-700 px-4 py-3 rounded-lg" />
                </div>
                <div>
                  <label className="block text-gray-400 mb-2">Height (cm)</label>
                  <input type="number" value={profile.height} onChange={(e) => setProfile({...profile, height: parseInt(e.target.value)})} onBlur={() => saveProfile(profile)} className="w-full bg-gray-700 px-4 py-3 rounded-lg" />
                </div>
              </div>
              
              <div>
                <label className="flex items-center gap-3">
                  <input type="checkbox" checked={profile.isSmoker} onChange={(e) => { const newProfile = {...profile, isSmoker: e.target.checked}; setProfile(newProfile); saveProfile(newProfile); }} className="w-5 h-5" />
                  <span>I am a smoker</span>
                </label>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4">Your Metabolism</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-blue-100 mb-1">BMR</div>
                <div className="text-2xl font-bold">{Math.round(bmr)} cal/day</div>
              </div>
              <div>
                <div className="text-sm text-blue-100 mb-1">TDEE</div>
                <div className="text-2xl font-bold">{Math.round(tdee)} cal/day</div>
              </div>
            </div>
            {profile.isSmoker && (
              <p className="text-sm text-blue-100 mt-4">
                ⚠️